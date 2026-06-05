import s from './ActorCard.module.css'

type ActorCardProps = {
    name: string;
    character: string;
    profilePath: string | null;
};

export const ActorCard = ({ name, character, profilePath }: ActorCardProps) => {
    const imageUrl = profilePath
        ? `https://image.tmdb.org/t/p/w185${profilePath}`
        : null

    return (
        <div className={s.actorCard}>
            <div className={s.photoWrapper}>
                {imageUrl ? (
                    <img src={imageUrl} alt={name} className={s.photo} />
                ) : (
                    <div className={s.photoPlaceholder}>
                        <span>No photo</span>
                    </div>
                )}
            </div>
            <div className={s.info}>
                <h4 className={s.actorName}>{name}</h4>
                <p className={s.characterName}>{character}</p>
            </div>
        </div>
    );
};