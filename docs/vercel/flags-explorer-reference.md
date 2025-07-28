# Reference

Flags Explorer is available on [all plans](/docs/plans)

The Flags Explorer has five main concepts: the [API Endpoint](/docs/feature-flags/flags-explorer/reference#api-endpoint), the [FLAGS\_SECRET environment variable](/docs/feature-flags/flags-explorer/reference#flags_secret-environment-variable), the [override cookie](/docs/feature-flags/flags-explorer/reference#override-cookie), [flag definitions](/docs/feature-flags/flags-explorer/reference#definitions), and [flag values](/docs/feature-flags/flags-explorer/reference#values).

## [Definitions](#definitions)

The Flags Explorer needs to know about your feature flags before it can display them.

Flag definitions are metadata for your feature flags, which communicate:

*   Name
*   URL for where your team can manage the flag
*   Description
*   Possible values and their (optional) labels

A definition can never communicate the value of a flag as they load independently from [flag values](/docs/feature-flags/flags-explorer/reference#values). See [flag definitions](/docs/feature-flags/flags-explorer/reference#definitions) for more information.

```
{
  "bannerFlag": {
    "origin": "https://example.com/flag/bannerFlag",
    "description": "Determines whether the banner is shown",
    "options": [
      { "value": true, "label": "on" },
      { "value": false, "label": "off" }
    ]
  }
}
```

This is how Vercel Toolbar shows flag definitions:

![Flags Explorer showing flag values.](/vc-ap-vercel-docs/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fv1689795055%2Fdocs-assets%2Fstatic%2Fdocs%2Fworkflow-collaboration%2Ffeature-flags%2Fflags-explorer-definitions-light.png&w=1080&q=75)![Flags Explorer showing flag values.](/vc-ap-vercel-docs/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fv1689795055%2Fdocs-assets%2Fstatic%2Fdocs%2Fworkflow-collaboration%2Ffeature-flags%2Fflags-explorer-definitions-dark.png&w=1080&q=75)

Flags Explorer showing flag values.

There are two ways to provide your feature flags to the Flags Explorer:

1.  [Returning definitions through the Flags API Endpoint](/docs/feature-flags/flags-explorer/reference#returning-definitions-through-the-flags-api-endpoint)
2.  [Embedding definitions through script tags](/docs/feature-flags/flags-explorer/reference#embedding-definitions-through-script-tags)

### [Returning definitions through the Flags API Endpoint](#returning-definitions-through-the-flags-api-endpoint)

The Flags API Endpoint is the recommended way to provide your feature flags to the Flags Explorer. The Flags Explorer will request your application's [Flags API Endpoint](/docs/feature-flags/flags-explorer/reference#api-endpoint) to fetch the feature flag definitions and other settings.

See [Definitions properties](/docs/feature-flags/flags-explorer/reference#definitions-properties) for a full list of properties you can return from your Flags API Endpoint.

### [Embedding definitions through script tags](#embedding-definitions-through-script-tags)

We strongly recommend communicating your feature flag definitions through the [Flags API Endpoint](/docs/feature-flags/flags-explorer/reference#api-endpoint). In rare cases, it can be useful to communicate feature flag definitions through the HTML response. Vercel Toolbar will pick up any script tags included in the DOM which have a `data-flag-definitions` attribute.

If you are using React or Next.js, use the [`FlagsDefinitions`](https://flags-sdk.dev/docs/api-reference/core/react#flagdefinitions) component. If you are using another framework or no framework at all you can render these script tags manually. The expected shape is:

```
type FlagDefinitionsType = Record<
  string,
  {
    options?: {
      value: any;
      label?: string;
    }[];
    origin?: string;
    description?: string;
  }
>;
```

This example shows how to communicate a feature flag definition through the DOM:

```
<script type="application/json" data-flag-definitions>
  {
    "showBanner": {
      "description": "Shows or hide the banner",
      "origin": "https://example.com/showBanner",
      "options": [
        { "value": false, "label": "Hide" },
        { "value": true, "label": "Show" }
      ]
    }
  }
</script>
```

You can also encrypt the definitions before emitting them to prevent leaking your feature flags through the DOM.

```
import { safeJsonStringify } from 'flags';
 
<script type="application/json" data-flag-definitions>
  ${safeJsonStringify(definitions)}
</script>;
```

Using `JSON.stringify` within script tags leads to [XSS vulnerabilities](https://owasp.org/www-community/attacks/xss/). Use `safeJsonStringify` exported by `flags` to stringify safely.

## [Values](#values)

Your Flags API Endpoint returns your application's feature flag definitions containing information like their key, description, origin, and available options. However the Flags API Endpoint can not return the value a flag evaluated to, since this value might depend on the request which rendered the page initially.

You can optionally provide the values of your feature flags to Flags Explorer in two ways:

1.  [Emitting values using the React components](/docs/feature-flags/flags-explorer/reference#emitting-values-using-the-flagvalues-react-component)
2.  [Embedding values through script tags](/docs/feature-flags/flags-explorer/reference#embedding-values-through-script-tags)

Emitted values will show up in the Flags Explorer, and will be used by [Web Analytics to annotate events](/docs/feature-flags/integrate-with-web-analytics).

This is how Vercel Toolbar shows flag values:

![Default Feature Flag Values in Vercel Toolbar.](/vc-ap-vercel-docs/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fv1689795055%2Fdocs-assets%2Fstatic%2Fdocs%2Fworkflow-collaboration%2Ffeature-flags%2Fflags-explorer-default-value-light.png&w=1080&q=75)![Default Feature Flag Values in Vercel Toolbar.](/vc-ap-vercel-docs/_next/image?url=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Fv1689795055%2Fdocs-assets%2Fstatic%2Fdocs%2Fworkflow-collaboration%2Ffeature-flags%2Fflags-explorer-default-value-dark.png&w=1080&q=75)

Default Feature Flag Values in Vercel Toolbar.

Any JSON-serializable values are supported. Flags Explorer combines these values with any definitions, if they are present.

```
{ "bannerFlag": true, "buttonColor": "blue" }
```

### [Emitting values using the FlagValues React component](#emitting-values-using-the-flagvalues-react-component)

The `flags` package exposes React components which allow making the Flags Explorer aware of your feature flag's values.

Next.js (/app)Next.js (/pages)

```
import { FlagValues } from 'flags/react';
 
export function Page() {
  return (
    <div>
      {/* Some other content */}
      <FlagValues values={{ exampleFlag: true }} />
    </div>
  );
}
```

The approaches above will add the names and values of your feature flags to the DOM in plain text. Use the `encrypt` function to keep your feature flags confidential.

Next.js (/app)Next.js (/pages)

```
import { encryptFlagValues, type FlagValuesType } from 'flags';
import { FlagValues } from 'flags/react';
 
async function ConfidentialFlagValues({ values }: { values: FlagValuesType }) {
  const encryptedFlagValues = await encryptFlagValues(values);
  return <FlagValues values={encryptedFlagValues} />;
}
 
export function Page() {
  const values = { exampleFlag: true };
  return (
    <div>
      {/* Some other content */}
      <Suspense fallback={null}>
        <ConfidentialFlagValues values={values} />
      </Suspense>
    </div>
  );
}
```

The `FlagValues` component will emit a script tag with a `data-flag-values` attribute, which get picked up by the Flags Explorer. Flags Explorer then combines the flag values with the definitions returned by your API endpoint. If you are not using React or Next.js you can render these script tags manually as shown in the next section.

### [Embedding values through script tags](#embedding-values-through-script-tags)

Flags Explorer scans the DOM for script tags with the `data-flag-values` attribute. Any changes to content get detected by a mutation observer.

You can emit the values of feature flags to the Flags Explorer by rendering script tags with the `data-flag-values` attribute.

```
<script type="application/json" data-flag-values>
  {
    "showBanner": true,
    "showAds": false,
    "pricing": 5
  }
</script>
```

Be careful when creating these script tags. Using `JSON.stringify` within script tags leads to [XSS vulnerabilities](https://owasp.org/www-community/attacks/xss/). Use `safeJsonStringify` exported by `flags` to stringify safely.

The expected shape is:

```
type FlagValues = Record<string, any>;
```

To prevent disclosing feature flag names and values to the client, the information can be encrypted. This keeps the feature flags confidential. Use the Flags SDK's `encryptFlagValues` function together with the `FLAGS_SECRET` environment variable to encrypt your flag values on the server before rendering them on the client. The Flags Explorer will then read these encrypted values and use the `FLAGS_SECRET` from your project to decrypt them.

```
import { encryptFlagValues, safeJsonStringify } from 'flags';
 
// Encrypt your flags and their values on the server.
const encryptedFlagValues = await encryptFlagValues({
  showBanner: true,
  showAds: false,
  pricing: 5,
});
 
// Render the encrypted values on the client.
// Note: Use `safeJsonStringify` to ensure `encryptedFlagValues` is correctly formatted as JSON.
//       This step may vary depending on your framework or setup.
<script type="application/json" data-flag-values>
  {safeJsonStringify(encryptedFlagValues)}
</script>;
```

## [`FLAGS_SECRET` environment variable](#flags_secret-environment-variable)

This secret gates access to the Flags API endpoint, and optionally enables signing and encrypting feature flag overrides set by Vercel Toolbar. As described below, you can ensure that the request is authenticated in your [Flags API endpoint](/docs/feature-flags/flags-explorer/reference#api-endpoint), by using [`verifyAccess`](https://flags-sdk.dev/docs/api-reference/core/core#verifyaccess).

You can create this secret by following the instructions in the [Flags Explorer Quickstart](/docs/feature-flags/flags-explorer/getting-started#adding-a-flags_secret). Alternatively, you can create the `FLAGS_SECRET` manually by following the instructions below.

Manually creating the `FLAGS_SECRET`

The `FLAGS_SECRET` value must have a specific length (32 random bytes encoded in base64) to work as an encryption key. You can create one using node:

```
node -e "console.log(crypto.randomBytes(32).toString('base64url'))"
```

In your local environment, pull your environment variables with `vercel env pull` to make them available to your project.

The `FLAGS_SECRET` environment variable must be defined in your project settings on the Vercel dashboard. Defining the environment variable locally is not enough as Flags Explorer reads the environment variable from your project settings.

## [API endpoint](#api-endpoint)

When you have set the [`FLAGS_SECRET`](/docs/feature-flags/flags-explorer/reference#flags_secret-environment-variable) environment variable in your project, Flags Explorer will request your application's [Flags API endpoint](/docs/feature-flags/flags-explorer/reference#api-endpoint). This endpoint should return a configuration for the Flags Explorer that includes the flag definitions.

### [Verifying a request to the API endpoint](#verifying-a-request-to-the-api-endpoint)

Your endpoint should call `verifyAccess` to ensure the request to load flags originates from Vercel Toolbar. This prevents your feature flag definitions from being exposed publicly thorugh the API endpoint. The `Authorization` header sent by Vercel Toolbar contains proof that whoever made this request has access to `FLAGS_SECRET`. The secret itself is not sent over the network.

If the `verifyAccess` check fails, you should return status code `401` and no response body. When the `verifyAccess` check is successful, return the feature flag definitions and other configuration as JSON:

Using the Flags SDK

Next.js (/app)Next.js (/pages)

```
import { getProviderData, createFlagsDiscoveryEndpoint } from 'flags/next';
import * as flags from '../../../../flags';
 
export const GET = createFlagsDiscoveryEndpoint(() => getProviderData(flags));
```

Using a custom setup

If you are not using the Flags SDK to define feature flags in code, or if you are not using Next.js or SvelteKit, you need to manually return the feature flag definitions from your API endpoint.

Next.js (/app)Next.js (/pages)

```
import { NextResponse, type NextRequest } from 'next/server';
import { verifyAccess, type ApiData } from 'flags';
 
export async function GET(request: NextRequest) {
  const access = await verifyAccess(request.headers.get('Authorization'));
  if (!access) return NextResponse.json(null, { status: 401 });
 
  return NextResponse.json<ApiData>({
    definitions: {
      newFeature: {
        description: 'Controls whether the new feature is visible',
        origin: 'https://example.com/#new-feature',
        options: [
          { value: false, label: 'Off' },
          { value: true, label: 'On' },
        ],
      },
    },
  });
}
```

### [Valid JSON response](#valid-json-response)

The JSON response must have the following shape

```
type ApiData = {
  definitions: Record<
    string,
    {
      description?: string;
      origin?: string;
      options?: { value: any; label?: string }[];
    }
  >;
  hints?: { key: string; text: string }[];
  overrideEncryptionMode?: 'plaintext' | 'encrypted';
};
```

### [Definitions properties](#definitions-properties)

These are your application's feature flags. You can return the following data for each definition:

| Property | Type | Description |
| --- | --- | --- |
| `description` (optional) | string | A description of what this feature flag is for. |
| `origin` (optional) | string | The URL where feature flag is managed. This usually points to the flag details page in your feature flag provider. |
| `options` (optional) | `{ value: any, label?: string }[]` | An array of options. These options will be available as overrides in Vercel Toolbar. |

You can optionally tell Vercel Toolbar about the actual value flags resolved to. The Flags API Endpoint cannot return this as the value might differ for each request. See [Flag values](/docs/feature-flags/flags-explorer/reference#values) instead.

### [Hints](#hints)

In some cases you might need to fetch your feature flag definitions from your feature flag provider before you can return them from the Flags API Endpoint.

In case this request fails you can use `hints`. Any hints returned will show up in the UI.

This is useful when you are fetching your feature flags from multiple sources. In case one request fails you might still want to show the remaining flags on a best effort basis, while also displaying a hint that fetching a specific source failed. You can return `definitions` and `hints` simultaneously to do so.

### [Override mode](#override-mode)

When you create an override, Vercel Toolbar will set a cookie called `vercel-flag-overrides`. You can read this cookie in your applications to make your application respect the overrides set by Vercel Toolbar.

The `overrideEncryptionMode` setting controls the value of the cookie:

*   `plaintext`: The cookie will contain the overrides as plain JSON. Be careful not to trust those overrides as users can manipulate the value easily.
*   `encrypted`: Vercel Toolbar will encrypt overrides using the `FLAGS_SECRET` before storing them in the cookie. This prevents manipulation, but requries decrypting them on your end before usage.

We highly recommend using `encrypted` mode as it protects against manipulation.

## [Override cookie](#override-cookie)

The Flags Explorer will set a cookie called `vercel-flag-overrides` containing the overrides.

Using the Flags SDK

If you use the Flags SDK for Next.js or SvelteKit, the SDK will automatically handle the overrides set by the Flags Explorer.

Manual setup

Read this cookie and use the `decrypt` function to decrypt the overrides and use them in your application. The decrypted value is a JSON object containing the name and override value of each overridden flag.

Next.js (/app)Next.js (/pages)

```
import { type FlagOverridesType, decryptOverrides } from 'flags';
import { type NextRequest } from 'next/server';
import { cookies } from 'next/headers';
 
async function getFlags(request: NextRequest) {
  const overrideCookie = cookies().get('vercel-flag-overrides')?.value;
  const overrides = overrideCookie
    ? await decryptOverrides<FlagOverridesType>(overrideCookie)
    : {};
 
  const flags = {
    exampleFlag: overrides?.exampleFlag ?? false,
  };
 
  return flags;
}
```

## [Script tags](#script-tags)

Vercel Toolbar uses a [MutationObserver](https://developer.mozilla.org/docs/Web/API/MutationObserver) to find all script tags with `data-flag-values` and `data-flag-definitions` attributes. Any changes to content get detected by the toolbar.

For more information, see the following sections:

*   [Embedding definitions through script tags](/docs/feature-flags/flags-explorer/reference#embedding-definitions-through-script-tags)
*   [Embedding values through script tags](/docs/feature-flags/flags-explorer/reference#embedding-values-through-script-tags)

Last updated on July 18, 2025