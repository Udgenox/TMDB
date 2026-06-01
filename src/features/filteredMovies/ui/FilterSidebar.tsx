import type {SortOption} from "@/app/api";
import {useGetGenresQuery} from "@/app/api/tmdbApi";
import {DoubleRangeSlider} from "@/common/components/DoubleRangeSlider/DoubleRangeSlider";
import s from './FilterSidebar.module.css'

type FilterSidebarProps = {
    sortBy: SortOption;
    ratingMin: number;
    ratingMax: number;
    selectedGenres: number[];
    onSortChange: (value: SortOption) => void;
    onRatingMinChange: (value: number) => void;
    onRatingMaxChange: (value: number) => void;
    onGenreToggle: (genreId: number) => void;
    onReset: () => void;
};

const sortOptions: { value: SortOption; label: string }[] = [
    { value: 'popularity.desc', label: 'Popularity ↓' },
    { value: 'popularity.asc', label: 'Popularity ↑' },
    { value: 'vote_average.desc', label: 'Rating ↓' },
    { value: 'vote_average.asc', label: 'Rating ↑' },
    { value: 'primary_release_date.desc', label: 'Release Date (Newest first)' },
    { value: 'primary_release_date.asc', label: 'Release Date (Oldest first)' },
    { value: 'original_title.asc', label: 'Title A-Z' },
    { value: 'original_title.desc', label: 'Title Z-A' },
];

export const FilterSidebar = ({
                                  sortBy,
                                  ratingMin,
                                  ratingMax,
                                  selectedGenres,
                                  onSortChange,
                                  onRatingMinChange,
                                  onRatingMaxChange,
                                  onGenreToggle,
                                  onReset,
                              }: FilterSidebarProps) => {
    const { data: genresData } = useGetGenresQuery();

    const handleRatingChange = (min: number, max: number) => {
        onRatingMinChange(min);
        onRatingMaxChange(max);
    };

    return (
        <div className={s.sidebar}>
            {/* Сортировка */}
            <div className={s.filterSection}>
                <h3 className={s.filterTitle}>Sort</h3>
                <select
                    className={s.select}
                    value={sortBy}
                    onChange={(e) => onSortChange(e.target.value as SortOption)}
                >
                    {sortOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>

            {/* Рейтинг — один слайдер с двумя бегунками */}
            <div className={s.filterSection}>
                <h3 className={s.filterTitle}>Rating</h3>
                <DoubleRangeSlider
                    min={0}
                    max={10}
                    step={0.1}
                    valueMin={ratingMin}
                    valueMax={ratingMax}
                    onChange={handleRatingChange}
                />
            </div>

            {/* Жанры */}
            <div className={s.filterSection}>
                {/*<h3 className={s.filterTitle}>Genres</h3>*/}
                <div className={s.genresGrid}>
                    {genresData?.genres.map((genre) => (
                        <button
                            key={genre.id}
                            className={`${s.genreButton} ${selectedGenres.includes(genre.id) ? s.genreActive : ''}`}
                            onClick={() => onGenreToggle(genre.id)}
                        >
                            {genre.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Кнопка сброса */}
            <button className={s.resetButton} onClick={onReset}>
                Reset filters
            </button>
        </div>
    );
};