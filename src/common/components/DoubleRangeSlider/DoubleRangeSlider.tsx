import { useRef, useState, useEffect } from 'react';
import s from './DoubleRangeSlider.module.css';

type DoubleRangeSliderProps = {
    min: number;
    max: number;
    step?: number;
    valueMin: number;
    valueMax: number;
    onChange: (min: number, max: number) => void;
};

export const DoubleRangeSlider = ({
                                      min,
                                      max,
                                      step = 0.1,
                                      valueMin,
                                      valueMax,
                                      onChange,
                                  }: DoubleRangeSliderProps) => {
    const [localMin, setLocalMin] = useState(valueMin);
    const [localMax, setLocalMax] = useState(valueMax);
    const sliderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setLocalMin(valueMin);
        setLocalMax(valueMax);
    }, [valueMin, valueMax]);

    const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newMin = Math.min(parseFloat(e.target.value), localMax - step);
        setLocalMin(newMin);
        onChange(newMin, localMax);
    };

    const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newMax = Math.max(parseFloat(e.target.value), localMin + step);
        setLocalMax(newMax);
        onChange(localMin, newMax);
    };

    // Вычисляем позиции для отображения активной зоны
    const minPercent = ((localMin - min) / (max - min)) * 100;
    const maxPercent = ((localMax - min) / (max - min)) * 100;

    return (
        <div className={s.sliderContainer} ref={sliderRef}>
            <div className={s.sliderTrack} />
            <div
                className={s.sliderRange}
                style={{
                    left: `${minPercent}%`,
                    right: `${100 - maxPercent}%`,
                }}
            />
            <input
                type="range"
                className={`${s.sliderInput} ${s.sliderInputLeft}`}
                min={min}
                max={max}
                step={step}
                value={localMin}
                onChange={handleMinChange}
            />
            <input
                type="range"
                className={`${s.sliderInput} ${s.sliderInputRight}`}
                min={min}
                max={max}
                step={step}
                value={localMax}
                onChange={handleMaxChange}
            />
            <div className={s.labels}>
                <span>{localMin.toFixed(1)}</span>
                <span>{localMax.toFixed(1)}</span>
            </div>
        </div>
    );
};