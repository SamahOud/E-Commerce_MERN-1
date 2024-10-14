import { Container, Grid } from "@mui/material"

const ErrorPage = () => {
    return (
        <Container >
            <Grid container spacing={2}>
                <Grid item xs={12} md={12} justifyContent="center">
                    <img src="../../public/assets/error_oops1.png"
                        alt="broken robot" width="100%" />
                </Grid>                
            </Grid>
        </Container>
    )
}

export default ErrorPage
