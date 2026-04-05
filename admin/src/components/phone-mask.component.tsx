// @ts-ignore
// @ts-ignore
import { InputMask } from '@react-input/mask'

const PhoneInput = ({ onChange, record, property }) => {
    // Получаем значение поля из record.params
    const value = record.params[property.name] || '';

    const handleChange = (e) => {
        const rawValue = e.target.value;
        // Удаляем всё кроме цифр
        const digitsOnly = rawValue.replace(/\D/g, '');
        // Добавляем +7, если нужно
        const formattedValue = digitsOnly.length > 0 ? `+7 ${digitsOnly}` : '';

        // Передаем в AdminJS измененное значение
        onChange(formattedValue);
    };

    return (
        <InputMask
            mask="+7 (___) ___-__-__"
            replacement={{ _: /\d/ }}
            showMask
        />
    );
};

export default PhoneInput;