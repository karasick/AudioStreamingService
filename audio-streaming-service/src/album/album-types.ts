export enum AlbumType {
    ALBUM =   'album',
    SINGLE = 'single',
    PLAYLIST = 'playlist'
}

export class AlbumTypes {
    static getType = (albumType: string) : AlbumType  => {
        if(AlbumType)
        switch (albumType) {
            case AlbumType.ALBUM: {
                return AlbumType.ALBUM
            }
            case AlbumType.SINGLE: {
                return AlbumType.SINGLE
            }
            case AlbumType.PLAYLIST: {
                return AlbumType.PLAYLIST
            }
            default: {
                throw new Error(`Passed incorrect AlbumType: ${albumType}`)
            }
        }
    }
}