import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useCart } from '../context/Cart/CartContext';
import { Box, IconButton } from '@mui/material';

interface Props {
    _id: string;
    title: string;
    image: string;
    price: string;
}

const ProductCard = ({ _id, title, image, price }: Props) => {
    const { addItemToCart } = useCart()
    return (
        <Card
            sx={{
                maxWidth: 345,
                margin: '0 auto',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                overflow: 'hidden',
            }}
        >
            <CardMedia
                sx={{ height: 200, minWidth: 235, backgroundSize: 'contain'}}
                image={image}
            />

            <CardContent sx={{ paddingBottom: 0}}>
                <Button onClick={() => addItemToCart(_id)} fullWidth variant="contained" color="primary" sx={{ marginBottom: 2 }}>
                    Add To Cart
                </Button>

                <Typography variant="h6" gutterBottom>
                    {title}
                </Typography>
            </CardContent>

            <CardActions sx={{ display: 'flex', justifyContent: "space-between" }}>
                <IconButton sx={{  padding: 1 }}>
                    <FavoriteIcon />
                </IconButton>

                <Box style={{ marginTop: '8px' }}>
                    <Typography sx={{ color: 'red', fontWeight: 'bold', fontSize: '1.4rem', paddingRight: 1 }}>
                        ${price}
                    </Typography>
                </Box>
            </CardActions>
        </Card>
    );
}

export default ProductCard
