export const jwtConstants = {
    secretAccessKey: `${process.env.JWT_ACCESS_SECRET_KEY}` || 'Very_$tr0ng_Access_Secret_Key',
    secretRefreshKey: `${process.env.JWT_REFRESH_SECRET_KEY}` || 'Very_$tr0ng_Refresh_Secret_Key',
    accessExpiresIn: '24h',
    refreshExpiresIn: '30d'
}