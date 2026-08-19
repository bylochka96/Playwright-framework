export type CheckoutInformation = {
    firstName: string;
    lastName: string;
    postalCode: string;
};

export function buildCheckoutInformation(overrideValues: Partial<CheckoutInformation> = {}): CheckoutInformation {  
    return {
        firstName: "John",
        lastName: "Smith",
        postalCode: "12345",
        ...overrideValues
    };
}