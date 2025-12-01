import { Metadata } from 'next'
import PrivacySettings from '@/components/PrivacySettings'

export const metadata: Metadata = {
  title: 'Privacy Settings | PICABORD',
  description: 'Manage your privacy and consent preferences for analytics and cookies.',
}

/**
 * Privacy Settings Page
 * 
 * Allows users to view and manage their consent preferences.
 */
export default function PrivacySettingsPage() {
  return (
    <div className="min-h-screen bg-background py-20 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Privacy Settings
          </h1>
          <p className="text-lg text-muted-foreground">
            Manage your data and consent preferences. You have full control over your privacy.
          </p>
        </div>

        {/* Privacy Settings Component */}
        <PrivacySettings />

        {/* Additional Information */}
        <div className="mt-8 p-6 bg-muted/30 rounded-3xl">
          <h2 className="text-lg font-semibold text-foreground mb-3">
            Your Privacy Rights
          </h2>
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>
              <strong className="text-foreground">Right to Access:</strong> You can request a copy of the data we have about you.
            </p>
            <p>
              <strong className="text-foreground">Right to Deletion:</strong> You can request deletion of your data at any time.
            </p>
            <p>
              <strong className="text-foreground">Right to Object:</strong> You can object to processing of your data.
            </p>
            <p>
              <strong className="text-foreground">Right to Withdraw:</strong> You can withdraw consent at any time without affecting prior processing.
            </p>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Have questions about your privacy?{' '}
            <a 
              href="/contact" 
              className="text-primary hover:underline font-medium"
            >
              Contact us
            </a>
            {' '}or read our{' '}
            <a 
              href="/privacy" 
              className="text-primary hover:underline font-medium"
            >
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
