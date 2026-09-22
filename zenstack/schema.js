"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = exports.SchemaType = void 0;
const schema_1 = require("@zenstackhq/schema");
class SchemaType {
    provider = {
        type: "mysql"
    };
    models = {
        Account: {
            name: "Account",
            fields: {
                id: {
                    name: "id",
                    type: "String",
                    id: true,
                    attributes: [{ name: "@id" }, { name: "@default", args: [{ name: "value", value: schema_1.ExpressionUtils.call("uuid") }] }],
                    default: schema_1.ExpressionUtils.call("uuid")
                },
                username: {
                    name: "username",
                    type: "String"
                },
                name: {
                    name: "name",
                    type: "String",
                    optional: true
                },
                password: {
                    name: "password",
                    type: "String"
                },
                description: {
                    name: "description",
                    type: "String",
                    optional: true
                },
                journeys: {
                    name: "journeys",
                    type: "Journey",
                    array: true,
                    relation: { opposite: "account" }
                },
                reservations: {
                    name: "reservations",
                    type: "Reservation",
                    array: true,
                    relation: { opposite: "account" }
                },
                createdAt: {
                    name: "createdAt",
                    type: "DateTime",
                    attributes: [{ name: "@default", args: [{ name: "value", value: schema_1.ExpressionUtils.call("now") }] }, { name: "@db.DateTime", args: [{ name: "x", value: schema_1.ExpressionUtils.literal(0) }] }, { name: "@map", args: [{ name: "name", value: schema_1.ExpressionUtils.literal("created_at") }] }],
                    default: schema_1.ExpressionUtils.call("now")
                }
            },
            idFields: ["id"],
            uniqueFields: {
                id: { type: "String" }
            }
        },
        Journey: {
            name: "Journey",
            fields: {
                id: {
                    name: "id",
                    type: "String",
                    id: true,
                    attributes: [{ name: "@id" }, { name: "@default", args: [{ name: "value", value: schema_1.ExpressionUtils.call("uuid") }] }],
                    default: schema_1.ExpressionUtils.call("uuid")
                },
                startDate: {
                    name: "startDate",
                    type: "DateTime",
                    attributes: [{ name: "@db.DateTime", args: [{ name: "x", value: schema_1.ExpressionUtils.literal(0) }] }, { name: "@map", args: [{ name: "name", value: schema_1.ExpressionUtils.literal("start_date") }] }]
                },
                endDate: {
                    name: "endDate",
                    type: "DateTime",
                    attributes: [{ name: "@db.DateTime", args: [{ name: "x", value: schema_1.ExpressionUtils.literal(0) }] }, { name: "@map", args: [{ name: "name", value: schema_1.ExpressionUtils.literal("end_date") }] }]
                },
                startCity: {
                    name: "startCity",
                    type: "String",
                    attributes: [{ name: "@map", args: [{ name: "name", value: schema_1.ExpressionUtils.literal("start_city") }] }]
                },
                endCity: {
                    name: "endCity",
                    type: "String",
                    attributes: [{ name: "@map", args: [{ name: "name", value: schema_1.ExpressionUtils.literal("end_city") }] }]
                },
                totalPlaces: {
                    name: "totalPlaces",
                    type: "Decimal",
                    attributes: [{ name: "@db.Decimal", args: [{ name: "p", value: schema_1.ExpressionUtils.literal(15) }, { name: "s", value: schema_1.ExpressionUtils.literal(6) }] }]
                },
                createdBy: {
                    name: "createdBy",
                    type: "String",
                    attributes: [{ name: "@map", args: [{ name: "name", value: schema_1.ExpressionUtils.literal("created_by") }] }],
                    foreignKeyFor: [
                        "account"
                    ]
                },
                account: {
                    name: "account",
                    type: "Account",
                    attributes: [{ name: "@relation", args: [{ name: "fields", value: schema_1.ExpressionUtils.array("String", [schema_1.ExpressionUtils.field("createdBy")]) }, { name: "references", value: schema_1.ExpressionUtils.array("String", [schema_1.ExpressionUtils.field("id")]) }] }],
                    relation: { opposite: "journeys", fields: ["createdBy"], references: ["id"] }
                },
                reservations: {
                    name: "reservations",
                    type: "Reservation",
                    array: true,
                    relation: { opposite: "journey" }
                },
                createdAt: {
                    name: "createdAt",
                    type: "DateTime",
                    attributes: [{ name: "@default", args: [{ name: "value", value: schema_1.ExpressionUtils.call("now") }] }, { name: "@db.DateTime", args: [{ name: "x", value: schema_1.ExpressionUtils.literal(0) }] }, { name: "@map", args: [{ name: "name", value: schema_1.ExpressionUtils.literal("created_at") }] }],
                    default: schema_1.ExpressionUtils.call("now")
                }
            },
            idFields: ["id"],
            uniqueFields: {
                id: { type: "String" }
            }
        },
        Reservation: {
            name: "Reservation",
            fields: {
                id: {
                    name: "id",
                    type: "String",
                    id: true,
                    attributes: [{ name: "@id" }, { name: "@default", args: [{ name: "value", value: schema_1.ExpressionUtils.call("uuid") }] }],
                    default: schema_1.ExpressionUtils.call("uuid")
                },
                journeyId: {
                    name: "journeyId",
                    type: "String",
                    attributes: [{ name: "@map", args: [{ name: "name", value: schema_1.ExpressionUtils.literal("journey_id") }] }],
                    foreignKeyFor: [
                        "journey"
                    ]
                },
                accountId: {
                    name: "accountId",
                    type: "String",
                    attributes: [{ name: "@map", args: [{ name: "name", value: schema_1.ExpressionUtils.literal("account_id") }] }],
                    foreignKeyFor: [
                        "account"
                    ]
                },
                journey: {
                    name: "journey",
                    type: "Journey",
                    attributes: [{ name: "@relation", args: [{ name: "fields", value: schema_1.ExpressionUtils.array("String", [schema_1.ExpressionUtils.field("journeyId")]) }, { name: "references", value: schema_1.ExpressionUtils.array("String", [schema_1.ExpressionUtils.field("id")]) }] }],
                    relation: { opposite: "reservations", fields: ["journeyId"], references: ["id"] }
                },
                account: {
                    name: "account",
                    type: "Account",
                    attributes: [{ name: "@relation", args: [{ name: "fields", value: schema_1.ExpressionUtils.array("String", [schema_1.ExpressionUtils.field("accountId")]) }, { name: "references", value: schema_1.ExpressionUtils.array("String", [schema_1.ExpressionUtils.field("id")]) }] }],
                    relation: { opposite: "reservations", fields: ["accountId"], references: ["id"] }
                },
                createdAt: {
                    name: "createdAt",
                    type: "DateTime",
                    attributes: [{ name: "@default", args: [{ name: "value", value: schema_1.ExpressionUtils.call("now") }] }, { name: "@db.DateTime", args: [{ name: "x", value: schema_1.ExpressionUtils.literal(0) }] }, { name: "@map", args: [{ name: "name", value: schema_1.ExpressionUtils.literal("created_at") }] }],
                    default: schema_1.ExpressionUtils.call("now")
                }
            },
            idFields: ["id"],
            uniqueFields: {
                id: { type: "String" }
            }
        }
    };
    plugins = {};
}
exports.SchemaType = SchemaType;
exports.schema = new SchemaType();
//# sourceMappingURL=schema.js.map