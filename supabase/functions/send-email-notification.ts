import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const ADMIN_EMAIL = "nujoka1@gmail.com";

interface ServiceRequest {
  id: number;
  firstname: string;
  email: string;
  tel: string;
  devicetype: string;
  devicemodel: string;
  repairtype: string;
  description: string;
  servicedate: string;
}

serve(async (req) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
    });
  }

  try {
    const { record } = await req.json();

    // Send confirmation email to customer
    const customerEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "PhoneHub <noreply@phonehub.com>",
        to: record.email,
        subject: "Service Request Confirmation - PhoneHub",
        html: `
          <h2>Thank you, ${record.firstname}!</h2>
          <p>We've received your service request and will contact you shortly at <strong>${record.tel}</strong></p>
          
          <h3>Request Details:</h3>
          <ul>
            <li><strong>Device:</strong> ${record.devicetype} - ${record.devicemodel}</li>
            <li><strong>Repair Type:</strong> ${record.repairtype}</li>
            <li><strong>Requested Date:</strong> ${record.servicedate}</li>
            <li><strong>Description:</strong> ${record.description}</li>
          </ul>
          
          <p>Our team will get back to you within 24 hours.</p>
          <p>Best regards, <br/>PhoneHub Team</p>
        `,
      }),
    });

    // Send admin notification
    const adminEmailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "PhoneHub <noreply@phonehub.com>",
        to: ADMIN_EMAIL,
        subject: `New Service Request - ${record.devicetype} ${record.devicemodel}`,
        html: `
          <h2>New Service Request</h2>
          <h3>Customer Info:</h3>
          <ul>
            <li><strong>Name:</strong> ${record.firstname}</li>
            <li><strong>Email:</strong> ${record.email}</li>
            <li><strong>Phone:</strong> ${record.tel}</li>
          </ul>
          
          <h3>Device & Repair:</h3>
          <ul>
            <li><strong>Device:</strong> ${record.devicetype} - ${record.devicemodel}</li>
            <li><strong>Repair Type:</strong> ${record.repairtype}</li>
            <li><strong>Requested Date:</strong> ${record.servicedate}</li>
            <li><strong>Description:</strong> ${record.description}</li>
          </ul>
          
          <p><a href="https://phonehub-p4ukutzan-nujokas-projects.vercel.app/admin.html">View in Admin Dashboard</a></p>
        `,
      }),
    });

    const customerResult = await customerEmailResponse.json();
    const adminResult = adminEmailResponse.json();

    console.log("Customer email:", customerResult);
    console.log("Admin email:", adminResult);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Emails sent successfully",
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error sending emails:", error);
    return new Response(
      JSON.stringify({
        error: `Failed to send emails: ${error.message}`,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});
