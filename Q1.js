[ 
            {
                "$match" : {
                    "facility" : ObjectId("5ee1668a519d9628ee72f5b0")
                }
            }, 
            {
                "$match" : {
                    "PendingAmount" : {
                        "$gt" : 0
                    }
                }
            }, 
            {
                "$addFields" : {
                    "_To" : {
                        "$cond" : {
                            "if" : {
                                "$or" : [ 
                                    {
                                        "$eq" : [ 
                                            "$Payee", 
                                            "cyfs"
                                        ]
                                    }, 
                                    {
                                        "$eq" : [ 
                                            "$Payee", 
                                            "winz"
                                        ]
                                    }, 
                                    {
                                        "$eq" : [ 
                                            "$Payee", 
                                            "WINZ"
                                        ]
                                    }
                                ]
                            },
                            "then" : "$Payee",
                            "else" : {
                                "$toObjectId" : "$Payee"
                            }
                        }
                    }
                }
            }, 
            {
                "$lookup" : {
                    "from" : "amountpaids",
                    "let" : {
                        "creditnoteId" : "$_id"
                    },
                    "pipeline" : [ 
                        {
                            "$match" : {
                                "$expr" : {
                                    "$eq" : [ 
                                        "$creditnoteId", 
                                        "$$creditnoteId"
                                    ]
                                }
                            }
                        }, 
                        {
                            "$lookup" : {
                                "from" : "invoices",
                                "localField" : "invoiceId",
                                "foreignField" : "_id",
                                "as" : "amountPaidsinvoices"
                            }
                        }, 
                        {
                            "$project" : {
                                "amountPaidsinvoices.InvoiceNumber" : 1,
                                "journalId" : 1,
                                "Amount" : 1,
                                "created" : 1,
                                "invoiceId" : 1,
                                "paymentfrom" : 1,
                                "paymentDate" : 1,
                                "creditnoteId" : 1,
                                "syncDate" : 1,
                                "paymentType" : 1,
                                "creditNotesUsedAmount" : 1,
                                "selectedPayee" : 1
                            }
                        }
                    ],
                    "as" : "amountpaids"
                }
            }, 
            {
                "$lookup" : {
                    "from" : "childrens",
                    "let" : {
                        "childId" : "$Child"
                    },
                    "pipeline" : [ 
                        {
                            "$match" : {
                                "$expr" : {
                                    "$and" : [ 
                                        {
                                            "$eq" : [ 
                                                "$_id", 
                                                "$$childId"
                                            ]
                                        }, 
                                        {
                                            "$ne" : [ 
                                                "$isCloseAccount", 
                                                true
                                            ]
                                        }
                                    ]
                                }
                            }
                        }, 
                        {
                            "$project" : {
                                "officialFamilyName" : 1,
                                "officialGiven1Name" : 1,
                                "preferredGiven1Name" : 1
                            }
                        }
                    ],
                    "as" : "Child"
                }
            }, 
            {
                "$lookup" : {
                    "from" : "new-contacts",
                    "let" : {
                        "payeeId" : "$_To"
                    },
                    "pipeline" : [ 
                        {
                            "$match" : {
                                "$expr" : {
                                    "$eq" : [ 
                                        "$_id", 
                                        "$$payeeId"
                                    ]
                                }
                            }
                        }, 
                        {
                            "$project" : {
                                "firstName" : 1,
                                "lastName" : 1
                            }
                        }
                    ],
                    "as" : "Payee"
                }
            }, 
            {
                "$project" : {
                    "Child" : {
                        "$arrayElemAt" : [ 
                            "$Child", 
                            0
                        ]
                    },
                    "Payee" : {
                        "$arrayElemAt" : [ 
                            "$Payee", 
                            0
                        ]
                    },
                    "Amount" : "$Amount",
                    "IssueDate" : 1,
                    "Fees" : 1,
                    "CreditNumber" : 1,
                    "InvoiceNumber" : "$CreditNumber",
                    "PendingAmount" : "$PendingAmount",
                    "UsedAmount" : {
                        "$subtract" : [ 
                            "$Amount", 
                            "$PendingAmount"
                        ]
                    },
                    "created" : 1,
                    "amountpaids" : 1
                }
            }, 
            {
                "$match" : {
                    "Child._id" : {
                        "$exists" : true
                    },
                    "CreditNumber" : {
                        "$exists" : true
                    },
                    "Payee._id" : {
                        "$exists" : true
                    },
                    "IssueDate" : {
                        "$exists" : true
                    }
                }
            }, 
            {
                "$match" : {
                    "PendingAmount" : {
                        "$gt" : 0
                    }
                }
            }, 
            {
                "$facet" : {
                    "metaData" : [ 
                        {
                            "$count" : "count"
                        }
                    ],
                    "result" : [ 
                        {
                            "$skip" : 0
                        }, 
                        {
                            "$limit" : 100
                        }
                    ]
                }
            }
        ]