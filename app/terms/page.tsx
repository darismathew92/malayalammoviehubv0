import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service - Malayalam Movies Hub",
  description:
    "Terms of Service for Malayalam Movies Hub - Legal terms and conditions for using our Malayalam movie streaming platform and services.",
  robots: {
    index: true,
    follow: true,
  },
}

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms of Service</h1>
          <p className="text-sm text-gray-600 mb-8">Last updated: January 1, 2025</p>

          <div className="prose prose-gray max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 mb-4">
                By accessing and using Malayalam Movies Hub, you accept and agree to be bound by the terms and provision
                of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Description of Service</h2>
              <p className="text-gray-700 mb-4">
                Malayalam Movies Hub is a platform that provides information about Malayalam movies, including:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Movie reviews and ratings</li>
                <li>Trailers and promotional content</li>
                <li>Links to legitimate streaming platforms</li>
                <li>News and updates about Malayalam cinema</li>
                <li>Information about OTT releases</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. User Responsibilities</h2>
              <p className="text-gray-700 mb-4">As a user of our service, you agree to:</p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Use the service only for lawful purposes</li>
                <li>Not attempt to gain unauthorized access to our systems</li>
                <li>Not distribute malware or harmful content</li>
                <li>Respect intellectual property rights</li>
                <li>Provide accurate information when required</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Content and Copyright</h2>
              <p className="text-gray-700 mb-4">
                All content on Malayalam Movies Hub, including text, graphics, logos, and images, is protected by
                copyright and other intellectual property laws. We respect the intellectual property rights of others
                and expect users to do the same.
              </p>
              <p className="text-gray-700 mb-4">
                We do not host or distribute copyrighted movie content. We only provide information and links to
                legitimate streaming platforms where movies are legally available.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Third-Party Links</h2>
              <p className="text-gray-700 mb-4">
                Our website contains links to third-party websites and services, including but not limited to YouTube,
                Netflix, Amazon Prime Video, and Disney+ Hotstar. We are not responsible for the content, privacy
                policies, or practices of these third-party sites.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Disclaimer of Warranties</h2>
              <p className="text-gray-700 mb-4">
                The information on this website is provided on an "as is" basis. To the fullest extent permitted by law,
                Malayalam Movies Hub excludes all representations, warranties, conditions, and terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Limitation of Liability</h2>
              <p className="text-gray-700 mb-4">
                Malayalam Movies Hub shall not be liable for any indirect, incidental, special, consequential, or
                punitive damages, including without limitation, loss of profits, data, use, goodwill, or other
                intangible losses.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Privacy Policy</h2>
              <p className="text-gray-700 mb-4">
                Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the
                service, to understand our practices.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Advertising</h2>
              <p className="text-gray-700 mb-4">
                Our website may display advertisements from third-party advertisers. We are not responsible for the
                content of these advertisements or the practices of advertisers.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Modifications to Terms</h2>
              <p className="text-gray-700 mb-4">
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon
                posting on the website. Your continued use of the service constitutes acceptance of the modified terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Termination</h2>
              <p className="text-gray-700 mb-4">
                We may terminate or suspend your access to our service immediately, without prior notice or liability,
                for any reason whatsoever, including without limitation if you breach the Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Governing Law</h2>
              <p className="text-gray-700 mb-4">
                These Terms shall be interpreted and governed by the laws of India. Any disputes shall be subject to the
                exclusive jurisdiction of the courts in Kerala, India.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Contact Information</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  <strong>Malayalam Movies Hub</strong>
                  <br />
                  Email: legal@malayalammovieshub.com
                  <br />
                  Address: Kerala, India
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
