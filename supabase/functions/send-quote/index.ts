import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const RECIPIENT_EMAIL = "mdbadruddozarakib@gmail.com";

const ALLOWED_PLATFORMS = ["Shopify", "WordPress", "Webflow", "Wix", "Squarespace", "Custom"];
const EMAIL_REGEX = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

function isStr(v: unknown, min: number, max: number): v is string {
  return typeof v === "string" && v.trim().length >= min && v.length <= max;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const genericError = (status: number, message: string) =>
    new Response(JSON.stringify({ error: message }), {
      status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return genericError(400, "Invalid request body");
    }

    const {
      name,
      email,
      phone,
      websiteType,
      platform,
      pagesOrProducts,
      designReferences,
    } = body as Record<string, unknown>;

    // Server-side validation mirroring RLS WITH CHECK policy
    if (!isStr(name, 1, 200)) return genericError(400, "Invalid name");
    if (!isStr(email, 3, 320) || !EMAIL_REGEX.test(email as string))
      return genericError(400, "Invalid email");
    if (!isStr(phone, 1, 50)) return genericError(400, "Invalid phone");
    if (!isStr(websiteType, 1, 100)) return genericError(400, "Invalid website type");
    if (!isStr(platform, 1, 100)) return genericError(400, "Invalid platform");
    if (!ALLOWED_PLATFORMS.includes(platform as string))
      return genericError(400, "Invalid platform");
    if (pagesOrProducts != null && !(typeof pagesOrProducts === "string" && pagesOrProducts.length <= 2000))
      return genericError(400, "Invalid pages/products");
    if (designReferences != null && !(typeof designReferences === "string" && designReferences.length <= 2000))
      return genericError(400, "Invalid design references");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { error: dbError } = await supabase.from("quotes").insert({
      name: (name as string).trim(),
      email: (email as string).trim(),
      phone: (phone as string).trim(),
      website_type: websiteType,
      platform,
      pages_or_products: (pagesOrProducts as string) || null,
      design_references: (designReferences as string) || null,
    });

    if (dbError) {
      console.error("Database insert error:", dbError);
      return genericError(500, "An internal error occurred. Please try again.");
    }

    const emailBody = `
New Quote Request

Client Details:
- Name: ${name}
- Email: ${email}
- Phone: ${phone}

Project Details:
- Website Type: ${websiteType}
- Platform: ${platform}
- ${pagesOrProducts ? (platform === "Shopify" ? `Products: ${pagesOrProducts}` : `Pages: ${pagesOrProducts}`) : "Pages/Products: N/A"}
- Design References: ${designReferences || "None provided"}
    `.trim();

    console.log(`Quote notification for ${RECIPIENT_EMAIL}:\n${emailBody}`);

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error processing quote:", error);
    return genericError(500, "An internal error occurred. Please try again.");
  }
});
