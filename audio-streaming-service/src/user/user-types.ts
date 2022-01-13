export enum UserType {
    USER =   'user',
    PREMIUM_USER = 'premium-user',
    AUTHOR = 'author',
    ADMIN = 'admin'
}

export class UserTypes {
    static getType = (userType: string) : UserType  => {
        if(UserType)
        switch (userType) {
            case UserType.USER: {
                return UserType.USER
            }
            case UserType.PREMIUM_USER: {
                return UserType.PREMIUM_USER
            }
            case UserType.AUTHOR: {
                return UserType.AUTHOR
            }
            case UserType.ADMIN: {
                return UserType.ADMIN
            }
            default: {
                throw new Error(`Passed incorrect UserType: ${userType}`)
            }
        }
    }
}