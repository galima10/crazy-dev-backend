import { type SchemaDef, type AttributeApplication, type FieldDefault } from "@zenstackhq/schema";
export declare class SchemaType implements SchemaDef {
    provider: {
        readonly type: "mysql";
    };
    models: {
        readonly Account: {
            readonly name: "Account";
            readonly fields: {
                readonly id: {
                    readonly name: "id";
                    readonly type: "String";
                    readonly id: true;
                    readonly attributes: readonly AttributeApplication[];
                    readonly default: FieldDefault;
                };
                readonly username: {
                    readonly name: "username";
                    readonly type: "String";
                };
                readonly name: {
                    readonly name: "name";
                    readonly type: "String";
                    readonly optional: true;
                };
                readonly password: {
                    readonly name: "password";
                    readonly type: "String";
                };
                readonly description: {
                    readonly name: "description";
                    readonly type: "String";
                    readonly optional: true;
                };
                readonly journeys: {
                    readonly name: "journeys";
                    readonly type: "Journey";
                    readonly array: true;
                    readonly relation: {
                        readonly opposite: "account";
                    };
                };
                readonly reservations: {
                    readonly name: "reservations";
                    readonly type: "Reservation";
                    readonly array: true;
                    readonly relation: {
                        readonly opposite: "account";
                    };
                };
                readonly createdAt: {
                    readonly name: "createdAt";
                    readonly type: "DateTime";
                    readonly attributes: readonly AttributeApplication[];
                    readonly default: FieldDefault;
                };
            };
            readonly idFields: readonly ["id"];
            readonly uniqueFields: {
                readonly id: {
                    readonly type: "String";
                };
            };
        };
        readonly Journey: {
            readonly name: "Journey";
            readonly fields: {
                readonly id: {
                    readonly name: "id";
                    readonly type: "String";
                    readonly id: true;
                    readonly attributes: readonly AttributeApplication[];
                    readonly default: FieldDefault;
                };
                readonly startDate: {
                    readonly name: "startDate";
                    readonly type: "DateTime";
                    readonly attributes: readonly AttributeApplication[];
                };
                readonly endDate: {
                    readonly name: "endDate";
                    readonly type: "DateTime";
                    readonly attributes: readonly AttributeApplication[];
                };
                readonly startCity: {
                    readonly name: "startCity";
                    readonly type: "String";
                    readonly attributes: readonly AttributeApplication[];
                };
                readonly endCity: {
                    readonly name: "endCity";
                    readonly type: "String";
                    readonly attributes: readonly AttributeApplication[];
                };
                readonly totalPlaces: {
                    readonly name: "totalPlaces";
                    readonly type: "Decimal";
                    readonly attributes: readonly AttributeApplication[];
                };
                readonly createdBy: {
                    readonly name: "createdBy";
                    readonly type: "String";
                    readonly attributes: readonly AttributeApplication[];
                    readonly foreignKeyFor: readonly string[];
                };
                readonly account: {
                    readonly name: "account";
                    readonly type: "Account";
                    readonly attributes: readonly AttributeApplication[];
                    readonly relation: {
                        readonly opposite: "journeys";
                        readonly fields: readonly ["createdBy"];
                        readonly references: readonly ["id"];
                    };
                };
                readonly reservations: {
                    readonly name: "reservations";
                    readonly type: "Reservation";
                    readonly array: true;
                    readonly relation: {
                        readonly opposite: "journey";
                    };
                };
                readonly createdAt: {
                    readonly name: "createdAt";
                    readonly type: "DateTime";
                    readonly attributes: readonly AttributeApplication[];
                    readonly default: FieldDefault;
                };
            };
            readonly idFields: readonly ["id"];
            readonly uniqueFields: {
                readonly id: {
                    readonly type: "String";
                };
            };
        };
        readonly Reservation: {
            readonly name: "Reservation";
            readonly fields: {
                readonly id: {
                    readonly name: "id";
                    readonly type: "String";
                    readonly id: true;
                    readonly attributes: readonly AttributeApplication[];
                    readonly default: FieldDefault;
                };
                readonly journeyId: {
                    readonly name: "journeyId";
                    readonly type: "String";
                    readonly attributes: readonly AttributeApplication[];
                    readonly foreignKeyFor: readonly string[];
                };
                readonly accountId: {
                    readonly name: "accountId";
                    readonly type: "String";
                    readonly attributes: readonly AttributeApplication[];
                    readonly foreignKeyFor: readonly string[];
                };
                readonly journey: {
                    readonly name: "journey";
                    readonly type: "Journey";
                    readonly attributes: readonly AttributeApplication[];
                    readonly relation: {
                        readonly opposite: "reservations";
                        readonly fields: readonly ["journeyId"];
                        readonly references: readonly ["id"];
                    };
                };
                readonly account: {
                    readonly name: "account";
                    readonly type: "Account";
                    readonly attributes: readonly AttributeApplication[];
                    readonly relation: {
                        readonly opposite: "reservations";
                        readonly fields: readonly ["accountId"];
                        readonly references: readonly ["id"];
                    };
                };
                readonly createdAt: {
                    readonly name: "createdAt";
                    readonly type: "DateTime";
                    readonly attributes: readonly AttributeApplication[];
                    readonly default: FieldDefault;
                };
            };
            readonly idFields: readonly ["id"];
            readonly uniqueFields: {
                readonly id: {
                    readonly type: "String";
                };
            };
        };
    };
    plugins: {};
}
export declare const schema: SchemaType;
