import { Resend } from 'resend'

interface RequestBody {
	user_name: string
	user_email: string
	message: string
}

const resend = new Resend(import.meta.env.RESEND_API_KEY)

export async function POST({ request }: { request: Request }) {
	const { user_name, user_email, message }: RequestBody = await request.json()

	const { data, error } = await resend.emails.send({
		from: 'contact@rixel.dev',
		to: ['rikelvicapellan15@gmail.com'],
		subject: 'Message from website',
		html: `
			<!doctype html>
			<html lang="en">
			<head>
			<meta charset="utf-8" />
			<meta name="viewport" content="width=device-width,initial-scale=1" />
			<title>New Message</title>
			<style>
				@media only screen and (max-width:600px) {
				.container { width: 100% !important; padding: 18px !important; }
				.hero { font-size: 20px !important; }
				.content { font-size: 15px !important; }
				.card { padding: 10px !important; }
				.btn { display: block !important; text-align: center !important; }
				}
			</style>
			</head>
			<body style="margin:0; padding:0; background:#f2f4f7; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; color:#020617;">
			<span style="display:none; font-size:1px; color:#f2f4f7; line-height:1px; max-height:0; max-width:0; opacity:0; overflow:hidden;">
				New contact message from ${user_name}.
			</span>

			<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style=" width:100%;">
				<tr>
				<td align="center" style="padding:28px 12px;">
					<table role="presentation" class="container" width="600" cellpadding="0" cellspacing="0" style="width:600px; background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 6px 18px rgba(12,18,30,0.08);">
					<!-- Header -->
					<tr>
						<td style="background:linear-gradient(90deg,#020617 ,#0891b2); padding:22px;">
						<table role="presentation" width="100%">
							<tr>
							<td style="vertical-align:middle;">
								<h1 class="hero" style="margin:0; font-size:22px; color:#ffffff; font-weight:800; letter-spacing:-0.2px;">New Contact Message</h1>
								<p style="margin:6px 0 0 0; color:rgba(255,255,255,0.9); font-size:13px;">You've received a message from your contact form</p>
							</td>
							<td align="right" style="vertical-align:middle; height: 100%; display: flex; justify-content: center; align-items: center;">
								<div style="background:rgba(255,255,255,0.12); display: flex; justify-content: center; align-items: center; flex-direction: row; gap: .5rem; padding:8px; border-radius:8px; color:#fff; font-weight:700; font-size:13px;">
									<img src="https://rixel.dev/brand-svg.svg" style="width: 2rem;">
								Rixel
								</div>
							</td>
							</tr>
						</table>
						</td>
					</tr>

					<!-- Body -->
					<tr>
						<td style="padding:22px;" class="card">
						<table role="presentation" width="100%" cellpadding="0" cellspacing="0">
							<tr>
							<td style="padding-bottom:8px;">
								<p style="margin:0; font-size:14px; color:#102a43;">Hello team,</p>
								<p style="margin:8px 0 0 0; font-size:16px; color:#0f1724; line-height:1.45;" class="content">
								You’ve received a new message from the contact form. Here are the details:
								</p>
							</td>
							</tr>

							<!-- Sender Info -->
							<tr>
							<td style="padding-top:14px; padding-bottom:6px;">
								<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
								<tr>
									<td style=" vertical-align:top; margin-bottom: 10px; padding:8px 10px; background:#f8fafc; border-radius:8px 8px 0 0; font-size:13px; color:#64748b;">
									Name: ${user_name}
									</td>
								</tr>

								<tr>
									<td style="vertical-align:top; padding:8px 10px; background:#f8fafc; border-radius:0 0 8px 8px; font-size:13px; color:#64748b; ">
										Email:
										<a href="mailto:${user_email}" style="color:#0f1724; text-decoration:none;">${user_email}</a>
									</td>
								</tr>
								</table>
							</td>
							</tr>

							<!-- Message -->
							<tr>
							<td style="padding-top:12px;">
								<div style="background:#f8fafc; border-radius:10px; padding:14px; font-size:14px; color:#0f1724;">
								${message}
								</div>
							</td>
							</tr>

							<!-- Quick Action -->
							<tr>
							<td style="padding-top:18px;">
								<a class="btn" href="mailto:${user_email}?subject=Re:%20Your%20message" target="_blank" rel="noopener" style="display:inline-block; text-decoration:none; padding:12px 18px; border-radius:10px; background:linear-gradient(90deg,#0891b2, #020617); color:#ffffff; font-weight:800; font-size:14px; width: auto;">
								Reply to Sender
								</a>
							</td>
							</tr>

							<!-- Note -->
							<tr>
							<td style="padding-top:14px; font-size:12px; color:#64748b;">
								<em>This message contains the information sent by the user. Please save it or respond as needed.</em>
							</td>
							</tr>
						</table>
						</td>
					</tr>

					<!-- Footer -->
					<tr>
						<td style="background:#020617; color:#cbd5e1; padding:16px 22px; text-align:center; font-size:12px;">
						<div style="margin-bottom:6px;">Rixel — Contact</div>
						<div style="opacity:0.85;">El Pino • La Vega • Republica Dominicana</div>
						<div style="margin-top:8px; font-size:11px; opacity:0.75;">&copy; <span id="year">2025</span> Rixel. All rights reserved.</div>
						</td>
					</tr>
					</table>
				</td>
				</tr>
			</table>

			<script>
				try {
				document.getElementById('year').textContent = new Date().getFullYear();
				} catch(e) {}
			</script>
			</body>
			</html>
		`,
	})

	console.log(error)
	if (error) return new Response(JSON.stringify(error))

	return new Response(JSON.stringify(data))
}
