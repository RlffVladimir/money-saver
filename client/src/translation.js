const translation = {
    english: {
        Welcome: {
            title: 'moneysaver',
            subtitle: "A place to manage, register and share your expenses.",
            createAccountButton: "Create an account",
            signinSuccessMessage: "Account successfully created. Please login",
            welcomeMessage: {
                part1: "Welcome, ",
                part2: " and ",
                part3: "."
            },
            loginButton: "Login",
            todayTile: "Today",
            expensesTile: "Expenses",
            addExpenseLabel: "Add an expense", 
            example: {
                line1: "You can see the app functionality by loging-in with this account: ",
                line2: "account name: 123, password: 123"
            }
            
        },
        Login: {
            title: "Login",
            username: "Username",
            password: "Password",
            submitButton: "Submit"
        },
        Signup: {
            title: "Signup",
            username: "Username",
            password: "Password",
            oneAccountForTwoPersons: "One account for two persons",
            totalMoney: "Total Money",
            nameLabel1: "Set a name",
            nameLabel2: "Set another name",
            submitButton: "Submit"
        },
        Navbar: {
            title: "moneysaver",
            loginButton: "Login",
            signinButton: "Signup",
            logoutButton: "Logout",
            welcomeButton: "Homepage",
            todayButton: "Today",
            expensesButton: "Expenses",
            settingsCloseButton: "Close",
        },
        Today: {
            title: "Today",
            totalMoney: {
                title: "Total Money",
                text: {
                    part1: "Your shared total money is ",
                    part2: "."
                }
            },
            expenses: {
                title: "Expenses",
                text: {
                    line1_2: {
                        part1: " has spent ",
                        part2: " this month.",
                        part3: " has not spent anything."
                    },
                    line3: {
                        part1: "Total: "
                    },
                    noExpense: "No expense added yet."
                },            
            },
            balance: {
                title: "Balance",
                modifyBalanceButton: "Modify balance",
                closeButton: 'Close',
            },
            goal: {
                title: "Goal",
                text: {
                    line1: {
                        part1: "'s goal is ",
                        part2: ".",
                        part3: "'s goal is not defined yet."
                    },
                    line2: {
                        part1: "You can spend ",
                        part2: " left."
                    }
                },
                defineGoalButton: "Define a goal"
            },
        },
        Expenses: {
            title: "Expenses",
            noExpense: "none"
        },
        Settings: {
            title: "Settings",
            totalMoney: {
                text: "Total money: ",
                button: "Modify total money",
                dialog: {
                    title: "Change total money",
                    label: "Total money",
                    submitButton: "Submit",
                    cancelButton: "Cancel"
                }
            },
            goal: {
                text: {
                    defined: "'s goal is ",
                    notDefined: "'s goal is not defined yet."
                },
                button: "Modify month goal",
                dialog: {
                    title: "Change month goal",
                    label: "Goal",
                    submitButton: "Submit",
                    cancelButton: "Cancel"
                }
            },
            names: {
                text: {
                    part1: "Current names: ",
                    part2: " and ",
                },
                button: "Modify names",
                dialog: {
                    title: "Change names",
                    label1: "Name",
                    label2: "Name",
                    submitButton: "Submit",
                    cancelButton: "Cancel"
                }
            },
        },
        NewExpense: {
            title: "New Expense",
            name: "Name",
            whoPurchasedIt: "Who purchased it",
            amount: "Amount",
            button: "Add"
        },
        Donut: {
            title: "Expenses - ",
            total: "total "
        },
        ModifyBalance: {
            title: {
                part1: "Modify ",
                part2: "'s balance"
            },
            button: "Submit"
        },
        LastExpenses: {
            title: "Last expenses"
        },
    },
    japanese: {
        Welcome: {
            title: 'moneysaver',
            subtitle: "２人のお金を管理する",
            createAccountButton: "アカウント作成",
            signinSuccessMessage: "アカウントが作成されました。ログインして下さい。",
            welcomeMessage: {
                part1: "ようこそ！",
                part2: " と ",
                part3: ""
            },
            loginButton: "ログイン",
            todayTile: "今日のレポート",
            expensesTile: "支出",
            addExpenseLabel: "支出を追加",
            example: {
                line1: "アプリを見てみたい方は下記のアカウントでログインしてください：",
                line2: "アカウント名：123, パスワード：123"
            }
        },
        Login: {
            title: "ログイン",
            username: "ユーザーネーム",
            password: "パスワード",
            submitButton: "送信"
        },
        Signup: {
            title: "アカウント作成",
            username: "ユーザーネーム",
            password: "パスワード",
            oneAccountForTwoPersons: "※2人で使うアカウント",
            totalMoney: "２人の使えるお金",
            nameLabel1: "１人目の名前",
            nameLabel2: "２人目の名前",
            submitButton: "送信"
        },
        Navbar: {
            title: "moneysaver",
            loginButton: "ログイン",
            signinButton: "アカウント作成",
            logoutButton: "ログアウト",
            welcomeButton: "ホームページ",
            todayButton: "Today",
            expensesButton: "支出入力",
            settingsCloseButton: "閉じる",
        },
        Today: {
            title: "今日のレポート",
            totalMoney: {
                title: "２人のお金",
                text: {
                    part1: "２人の使えるお金は",
                    part2: "。"
                }
            },
            expenses: {
                title: "支出",
                text: {
                    line1_2: {
                        part1: "は今月、",
                        part2: "使った。",
                        part3: "はお金を使っていない。"
                    },
                    line3: {
                        part1: "合計："
                    },
                    noExpense: "支出がまだ追加されていない。"
                },
            },
            balance: {
                title: "差分",
                modifyBalanceButton: "差分を変更",
                closeButton: "閉じる",
            },
            goal: {
                title: "今月の目標",
                text: {
                    line1: {
                        part1: "月の目標は",
                        part2: "。",
                        part3: "月の目標は設定されていない。"
                    },
                    line2: {
                        part1: "あと",
                        part2: "使える。"
                    },
                },
                defineGoalButton: "目標を設定"
            },
            lastExpenses: {
                title: "最新の支出"
            }
        },
        Expenses: {
            title: "支出",
            noExpense: '無し'
        },
        Settings: {
            title: "設定",
            totalMoney: {
                text: "２人の使えるお金は",
                button: "変更",
                dialog: {
                    title: "合計を変更",
                    label: "合計",
                    submitButton: "確定",
                    cancelButton: "やめる"
                }
            },
            goal: {
                text: {
                    defined: "月の目標は",
                    notDefined: "月の目標はまだ設定されていない"
                },
                button: "変更",
                dialog: {
                    title: "目標を変更",
                    label: "今月の目標",
                    submitButton: "確定",
                    cancelButton: "やめる"
                }
            },
            names: {
                text: {
                    part1: "設定された名前は",
                    part2: "と"
                },
                button: "変更",
                dialog: {
                    title: "名前を変更",
                    label1: "1人目",
                    label2: "２人目",
                    submitButton: "確定",
                    cancelButton: "やめる"
                }
            },
            closeButton: "閉じる",
            
        },
        NewExpense: {
            title: "支出を追加する",
            name: "商品名",
            whoPurchasedIt: "購入者",
            amount: "料金",
            button: "追加"
        },
        Donut: {
            title: "支出",
            total: "・合計"
        },
        ModifyBalance: {
            title: {
                part1: "",
                part2: "の差分を変更"
            },
            button: "確定"
        },
        LastExpenses: {
            title: "最新の支出"
        }
    }
}

export default translation;