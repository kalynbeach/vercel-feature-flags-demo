import { showBanner, buttonColor, enableNewFeature } from "@/flags";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Lightbulb, PartyPopper, TestTube2 } from "lucide-react";

export default async function HomePage() {
  // Evaluate the flags on the server.
  // The values will be determined by your flag provider or the default values.
  const isBannerVisible = await showBanner();
  const mainButtonColor = await buttonColor();
  const isNewFeatureEnabled = await enableNewFeature();

  return (
    <div className="bg-background text-foreground min-h-screen">
      <main className="container mx-auto p-4 md:p-8">
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight">
              Vercel Feature Flags Demo
            </h1>
            <p className="text-muted-foreground mt-2 text-lg">
              See how feature flags can dynamically change a Next.js
              application.
            </p>
          </div>

          {/* Feature 1: Conditionally rendered banner */}
          {isBannerVisible && (
            <Alert className="border-green-500 text-green-700 dark:border-green-600 dark:text-green-400">
              <PartyPopper className="h-4 w-4 text-green-500" />
              <AlertTitle>Special Promotion!</AlertTitle>
              <AlertDescription>
                You&apos;re seeing this banner because the `show-banner` feature
                flag is enabled!
              </AlertDescription>
            </Alert>
          )}

          <div className="grid gap-8 md:grid-cols-2">
            {/* Main content and interactive elements */}
            <Card>
              <CardHeader>
                <CardTitle>Interactive Elements</CardTitle>
                <CardDescription>
                  These components are controlled by feature flags.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="mb-2 font-semibold">
                    Feature 2: Dynamic Button Style
                  </h3>
                  <p className="text-muted-foreground mb-4 text-sm">
                    The style of this button is determined by the `button-color`
                    flag.
                  </p>
                  <Button variant={mainButtonColor}>Click Me!</Button>
                </div>

                {/* Feature 3: Conditionally rendered feature section */}
                {isNewFeatureEnabled && (
                  <Card className="bg-muted/50">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TestTube2 className="text-primary h-5 w-5" />
                        Super-Secret Feature
                      </CardTitle>
                      <CardDescription>
                        This entire section is only visible when the
                        `enable-new-feature` flag is on.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>
                        Congratulations! You&apos;ve discovered our latest and
                        greatest feature. More amazing content coming here soon!
                      </p>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>

            {/* Current Flag States */}
            <Card>
              <CardHeader>
                <CardTitle>Current Flag States</CardTitle>
                <CardDescription>
                  These are the current values of the flags as evaluated on the
                  server.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <span className="font-mono text-sm">show-banner</span>
                  <Badge variant={isBannerVisible ? "default" : "secondary"}>
                    {isBannerVisible ? "ON" : "OFF"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <span className="font-mono text-sm">button-color</span>
                  <Badge variant="outline">{mainButtonColor}</Badge>
                </div>
                <div className="flex items-center justify-between rounded-lg border p-3">
                  <span className="font-mono text-sm">enable-new-feature</span>
                  <Badge
                    variant={isNewFeatureEnabled ? "default" : "secondary"}
                  >
                    {isNewFeatureEnabled ? "ON" : "OFF"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Explanation Section */}
          <div>
            <h2 className="mb-6 text-center text-2xl font-bold">
              About The Flags
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="font-mono text-base">
                    show-banner
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    A boolean flag that toggles a promotional banner. Useful for
                    marketing campaigns or announcements.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="font-mono text-base">
                    button-color
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    A string-based flag for A/B testing different button styles
                    to see which one performs better.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="font-mono text-base">
                    enable-new-feature
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    A boolean flag for a phased rollout of a new feature,
                    allowing you to release it to a subset of users first.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          <Alert>
            <Lightbulb className="h-4 w-4" />
            <AlertTitle>How to Change Flags</AlertTitle>
            <AlertDescription>
              After deploying this project to Vercel, you can use the Vercel
              Toolbar to override these flags in real-time without a new
              deployment. The changes will be reflected on your next page visit.
            </AlertDescription>
          </Alert>
        </div>
      </main>
    </div>
  );
}
