// src/pages/Legal/TermsOfService.tsx
const TermsOfService = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-4xl font-bold text-gray-800 dark:text-white">
          Terms of Service
        </h1>

        <div className="space-y-6 text-gray-700 dark:text-gray-300">
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-white">
              1. Acceptance of Terms
            </h2>
            <p className="leading-relaxed">
              By accessing and using BussinesCards platform, you accept and
              agree to be bound by the terms and provision of this agreement. If
              you do not agree to abide by the above, please do not use this
              service.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-white">
              2. Description of Service
            </h2>
            <p className="leading-relaxed">
              BussinesCards provides a platform for creating, sharing, and
              managing digital business cards. Our service allows users to
              create professional digital business cards, share them with
              contacts, and manage their business networking activities.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-white">
              3. User Accounts
            </h2>
            <p className="leading-relaxed">
              To access certain features of our service, you must register for
              an account. You are responsible for maintaining the
              confidentiality of your account information and for all activities
              that occur under your account.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-white">
              4. Acceptable Use
            </h2>
            <p className="leading-relaxed">
              You agree not to use the service for any unlawful purpose or in
              any way that could damage, disable, or impair the service. You may
              not upload or transmit any content that is harmful, threatening,
              abusive, or otherwise objectionable.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-white">
              5. Content Ownership
            </h2>
            <p className="leading-relaxed">
              You retain ownership of any content you create and share through
              our platform. However, by using our service, you grant us a
              license to use, display, and distribute your content as necessary
              to provide the service.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-white">
              6. Service Availability
            </h2>
            <p className="leading-relaxed">
              We strive to keep our service available at all times, but we
              cannot guarantee uninterrupted access. We reserve the right to
              modify or discontinue the service at any time with or without
              notice.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-white">
              7. Limitation of Liability
            </h2>
            <p className="leading-relaxed">
              In no event shall BussinesCards be liable for any indirect,
              incidental, special, consequential, or punitive damages, including
              without limitation, loss of profits, data, use, goodwill, or other
              intangible losses.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-white">
              8. Changes to Terms
            </h2>
            <p className="leading-relaxed">
              We reserve the right to modify these terms at any time. We will
              notify users of any material changes by posting the new terms on
              our website. Your continued use of the service after such changes
              constitutes acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-white">
              9. Contact Information
            </h2>
            <p className="leading-relaxed">
              If you have any questions about these Terms of Service, please
              contact us at support@businesscards.com or through our contact
              form.
            </p>
          </section>

          <div className="mt-8 border-t pt-6 text-sm text-gray-500 dark:text-gray-400">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
