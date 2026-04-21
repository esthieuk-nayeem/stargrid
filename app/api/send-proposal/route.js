import { Resend } from "resend";

const resend = new Resend("re_ExvFJYnS_H4AbnZrhaijK23PWypDfiCJr");

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      pdfBase64,
      companyName,
      contactName,
      contactEmail,
      refId,
      date,
      totalSites,
      contractValue,
    } = body;

    const orgName  = companyName  || "Your Organisation";
    const recipient = contactName || "Valued Client";

    const htmlBody = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>StarGrid Connectivity Solution Proposal</title>
</head>
<body style="margin:0;padding:0;background:#f0f2f8;font-family:'Segoe UI',Arial,Helvetica,sans-serif;">

  <!-- Wrapper -->
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f2f8;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="620" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

          <!-- Header gradient -->
          <tr>
            <td style="background:linear-gradient(135deg,#0e1470 0%,#1a2ea0 60%,#3D72FC 100%);padding:36px 48px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <p style="margin:0;font-size:11px;letter-spacing:2px;color:rgba(255,255,255,0.6);text-transform:uppercase;font-weight:600;">STARGRID</p>
                    <h1 style="margin:8px 0 0;font-size:26px;font-weight:800;color:#ffffff;letter-spacing:-0.3px;">
                      Industrial Connectivity Solutions
                    </h1>
                  </td>
                  <td align="right" style="vertical-align:top;">
                    <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.55);">${date || new Date().toLocaleDateString("en-GB", { day:"2-digit", month:"long", year:"numeric" })}</p>
                    <p style="margin:4px 0 0;font-size:11px;color:rgba(255,255,255,0.4);">Ref: ${refId || "SG-XXXXXXX"}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Gradient accent bar -->
          <tr>
            <td style="height:4px;background:linear-gradient(90deg,#3D72FC,#5CB0E9,#6669D8);"></td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 48px 32px;">

              <p style="margin:0 0 20px;font-size:15px;color:#444;line-height:1.6;">
                Dear <strong style="color:#12132a;">${recipient}</strong>,
              </p>

              <p style="margin:0 0 16px;font-size:15px;color:#555;line-height:1.75;">
                Thank you for using the <strong>StarGrid Connectivity Planner</strong>.
                We are pleased to share your personalised <strong>Connectivity Solution Proposal</strong> for
                <strong style="color:#3D72FC;">${orgName}</strong>.
              </p>

              <p style="margin:0 0 28px;font-size:15px;color:#555;line-height:1.75;">
                The attached PDF covers the full connectivity plan across
                <strong>${totalSites || "—"} site${(totalSites || 0) !== 1 ? "s" : ""}</strong>,
                including recommended hardware, airtime plans, managed service tiers,
                Proof-of-Concept pricing, and a complete deployment summary.
              </p>

              <!-- Highlights box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f9ff;border:1px solid #dce4fd;border-left:4px solid #3D72FC;border-radius:0 10px 10px 0;margin-bottom:28px;">
                <tr>
                  <td style="padding:20px 24px;">
                    <p style="margin:0 0 12px;font-size:12px;font-weight:700;color:#3D72FC;letter-spacing:0.8px;text-transform:uppercase;">Proposal Highlights</p>
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding:4px 0;font-size:14px;color:#555;">
                          📌&nbsp; <strong>${totalSites || "—"}</strong> configured site${(totalSites || 0) !== 1 ? "s" : ""}
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:4px 0;font-size:14px;color:#555;">
                          💰&nbsp; Total contract value: <strong style="color:#3D72FC;">${contractValue || "See PDF"}</strong>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:4px 0;font-size:14px;color:#555;">
                          🛰️&nbsp; Hybrid cellular · satellite · fixed connectivity
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:4px 0;font-size:14px;color:#555;">
                          🕐&nbsp; 24/7 managed service &amp; zero-touch failover
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 16px;font-size:15px;color:#555;line-height:1.75;">
                Please find the full proposal attached as a PDF.
                This offer is valid for <strong>30 days</strong> from the date of this email.
              </p>

              <p style="margin:0 0 32px;font-size:15px;color:#555;line-height:1.75;">
                If you have any questions or would like to proceed,
                please don't hesitate to reach out — we are happy to arrange a call.
              </p>

              <!-- CTA button -->
              <table cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
                <tr>
                  <td style="background:linear-gradient(135deg,#3D72FC,#5CB0E9);border-radius:10px;">
                    <a href="https://www.stargrid.one" target="_blank"
                      style="display:inline-block;padding:14px 36px;color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;letter-spacing:0.2px;">
                      Visit StarGrid →
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:0;font-size:15px;color:#444;line-height:1.6;">
                Best regards,<br />
                <strong style="color:#12132a;">The StarGrid Team</strong><br />
                <span style="font-size:13px;color:#999;">al@cellsat.one · www.stargrid.one</span>
              </p>

            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="padding:0 48px;">
              <hr style="border:none;border-top:1px solid #eef0f4;margin:0;" />
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 48px 28px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <p style="margin:0;font-size:11px;color:#bbb;line-height:1.6;">
                      StarGrid · Cellular · Satellite · Fixed<br />
                      This email and attachment are confidential and intended solely for the addressee.
                    </p>
                  </td>
                  <td align="right">
                    <p style="margin:0;font-size:11px;color:#bbb;">
                      <a href="https://www.stargrid.one/legal" style="color:#3D72FC;text-decoration:none;">Terms &amp; Conditions</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>`;

    const toAddresses = ["esthieuk@gmail.com","sales@stargrid.com"];
    if (contactEmail && contactEmail !== "esthieuk@gmail.com") {
      toAddresses.push(contactEmail);
    }

    const { data, error } = await resend.emails.send({
      from: "StarGrid <stargrid@naielts.com>",
      to:   toAddresses,
      subject: `StarGrid Connectivity Solution Proposal — ${orgName}`,
      html: htmlBody,
      attachments: [
        {
          filename: `StarGrid-Connectivity-Offer-${refId || "Proposal"}.pdf`,
          content:  pdfBase64,
        },
      ],
    });

    if (error) {
      console.error("Resend error:", error);
      return Response.json({ success: false, error: error.message }, { status: 400 });
    }

    return Response.json({ success: true, id: data?.id });
  } catch (err) {
    console.error("Send proposal error:", err);
    return Response.json({ success: false, error: String(err) }, { status: 500 });
  }
}
