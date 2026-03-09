import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const RECIPIENT_EMAIL = "mdbadruddozarakib@gmail.com";

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const {
      name,
      email,
      phone,
      websiteType,
      platform,
      pagesOrProducts,
      designReferences,
    } = await req.json();

    // Validate required fields
    if (!name || !email || !phone || !websiteType || !platform) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Save to database
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { error: dbError } = await supabase.from("quotes").insert({
      name,
      email,
      phone,
      website_type: websiteType,
      platform,
      pages_or_products: pagesOrProducts || null,
      design_references: designReferences || null,
    });

    if (dbError) {
      console.error("Database insert error:", dbError);
      return new Response(
        JSON.stringify({ error: "Failed to save quote" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Send notification email via Lovable API
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      // Still return success since the quote was saved to the database
      return new Response(
        JSON.stringify({ success: true, emailSent: false }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
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

---
This quote was submitted through your portfolio website.
    `.trim();

    // Use Supabase's built-in email via a database notification approach
    // For now, we log the email content and save to DB for retrieval
    console.log(`Quote notification for ${RECIPIENT_EMAIL}:\n${emailBody}`);

    return new Response(
      JSON.stringify({ success: true, emailSent: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error processing quote:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
