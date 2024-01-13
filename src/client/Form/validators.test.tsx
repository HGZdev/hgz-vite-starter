import {describe, expect, it} from "vitest";
import {validators} from "./validators";

describe("Form validators", () => {
  it("should validate required field", () => {
    expect(validators.required("")).toEqual("Please enter required field(s)");
    expect(validators.required("Some value")).toBeNull();
  });

  it("should validate email field", () => {
    const invalidEmailLabel = "Please enter a valid email address";

    const emailVariants: Record<string, string | null> = {
      // Valid email variants
      "bubu@interia.pl": null,
      "email@domain.com": null,
      "email123@domain.com": null,
      "email-with-hyphen@domain.com": null,
      "email_with_underscore@domain.com": null,
      "email.with.dots@domain.com": null,
      "email+tag@domain.com": null,
      "email@subdomain.domain.com": null,
      "email@[123.123.123.123]": null,

      // Invalid email variants
      "email@domain": invalidEmailLabel,
      "email@domain.": invalidEmailLabel,
      "email@.com": invalidEmailLabel,
      "email@domain..com": invalidEmailLabel,
      "email@domain_com": invalidEmailLabel,
      "email@domain,com": invalidEmailLabel,
      "email@domain com": invalidEmailLabel,
      "email@[IPv6:2001:db8::1]:123": invalidEmailLabel,
      "email@[IPv6:2001:db8::1]:123/abc": invalidEmailLabel,
    };

    Object.entries(emailVariants).forEach(([input, output]) => {
      expect(validators.email(input)).toEqual(output);
    });
  });

  it("should validate password field", () => {
    const invalidPasswordLabel =
      "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number";

    const passwordVariants = {
      // Invalid password variants
      weakpassword: invalidPasswordLabel,
      alllowercase: invalidPasswordLabel,
      ALLUPPERCASE: invalidPasswordLabel,
      NoNumberOrUppercase: invalidPasswordLabel,

      // Valid password variants
      StrongPassword123: null,
      SecurePassw0rd: null,
      "An0therStrongP@ssword": null,
    };

    Object.entries(passwordVariants).forEach(([input, output]) => {
      expect(validators.password(input)).toEqual(output);
    });
  });
});
