// src/pages/Legal/PrivacyPolicy.tsx
const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-4xl font-bold text-gray-800 dark:text-white">
          Privacy Policy
        </h1>

        <div className="space-y-6 text-gray-700 dark:text-gray-300">
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-white">
              1. Information We Collect
            </h2>
            <p className="leading-relaxed">
              We collect information you provide directly to us, such as when
              you create an account, update your profile, create business cards,
              or contact us for support. This includes your name, email address,
              phone number, business information, and any other information you
              choose to provide.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-white">
              2. How We Use Your Information
            </h2>
            <p className="leading-relaxed">
              We use the information we collect to provide, maintain, and
              improve our services, process transactions, send you technical
              notices and support messages, and communicate with you about
              products, services, and promotional offers.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-white">
              3. Information Sharing
            </h2>
            <p className="leading-relaxed">
              We do not sell, trade, or otherwise transfer your personal
              information to third parties without your consent, except as
              described in this policy. We may share your information with
              service providers who assist us in operating our platform.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-white">
              4. Data Security
            </h2>
            <p className="leading-relaxed">
              We implement appropriate security measures to protect your
              personal information against unauthorized access, alteration,
              disclosure, or destruction. However, no method of transmission
              over the internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-white">
              5. Your Rights
            </h2>
            <p className="leading-relaxed">
              You have the right to access, update, or delete your personal
              information. You can do this by logging into your account or
              contacting us directly. You also have the right to opt out of
              certain communications from us.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-gray-800 dark:text-white">
              6. Contact Us
            </h2>
            <p className="leading-relaxed">
              If you have any questions about this Privacy Policy, please
              contact us at support@businesscards.com or through our contact
              form on the website.
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

export default PrivacyPolicy;
