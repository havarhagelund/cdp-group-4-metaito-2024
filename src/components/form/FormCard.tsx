import { Card, CardContent } from '@/components/ui/card';
import { Form } from './Form';

export type CardData = {
    className?: String;
    card: Form;
    onClick?: () => void;
}

const FormCard: React.FC<CardData> = ({ card, onClick }) => {
    return (
        <Card className='w-32 h-32 m-2' onClick={onClick}>
            <CardContent>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    {card.icon}
                    <h1>{card.title}</h1>
                </div>
            </CardContent>
        </Card>
    );
}
export default FormCard;
