import { useState, useCallback } from "react";

// Тип для значений цвета
export type Color = {
  hex: string;
  rgb: string;
};

// Кастомный хук для управления цветом
const useRandomColor = () => {
  // Генерировать случайный цвет в формате HEX
  const generateRandomColor = () => {
    return `#${Math.floor(Math.random() * 0xffffff)
      .toString(16)
      .padEnd(6, "0")}`;
  };

  // Состояние для цвета
  const [color, setColor] = useState<Color>({
    hex: generateRandomColor(),
    rgb: "",
  });

  // Функция для преобразования HEX в RGB
  const hexToRgb = useCallback((hex: string) => {
    if (hex.charAt(0) === "#") {
      hex = hex.slice(1);
    }
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    return `rgb(${r}, ${g}, ${b}, 0.05)`;
  }, []);

  // Обновление цвета
  const handleColorChange = (newColor: any) => {
    setColor({
      hex: newColor,
      rgb: hexToRgb(newColor),
    });
  };

  // Инициализация RGB цвет
  color.rgb = hexToRgb(color.hex);

  // Возврат состояния и функций
  return {
    color,
    handleColorChange,
    generateRandomColor,
  };
};

export default useRandomColor;
