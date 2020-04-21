export default {
    palette: {
        primary: {
            light: '#33c9dc',
            main: '#00bcd4',
            dark: '#008394',
            contrastText: '#fff'
        },
        secondary: {
            light: '#ff6333',
            main: '#ff3d00',
            dark: '#b22a00',
            contrastText: '#fff'
        }
    },
    spreadThis: {
        buttons: {
            textAlign: 'center',
            '& a': {
                margin: '20px 10px'
            },
            closeButton: {
                position: 'absolute',
                top: '5px',
                right: '5px'
            }
        },
        typography: {
            useNextVariants: true
        },
        form: {
            textAlign: 'center'
        },
        image: {
            margin: '20px auto'
        },
        pageTitle: {
            margin: '10px auto'
        },
        textField: {
            margin: '15px auto'
        },
        button: {
            margin: '20px auto'
        },
        customError: {
            color: '#ff0000',
            fontSize: '0.8rem',
            margin: '5px auto'
        },
        small: {
            display: 'block',
            margin: '10px auto'
        },
        paper: {
            padding: 20
        },
        profile: {
            '& .image-wrapper': {
                textAlign: 'center',
                position: 'relative',
                '& button': {
                    position: 'absolute',
                    top: '80%',
                    left: '45%',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    padding: 5
                }
            },
            '& .profile-image': {
                width: 200,
                height: 200,
                objectFit: 'cover',
                maxWidth: '100%',
                borderRadius: '50%'
            },
            '& .profile-details': {
                textAlign: 'center',
                '& span, svg': {
                    verticalAlign: 'middle'
                },
                '& a': {
                    color: '#00bcd4'
                }
            },
            '& hr': {
                border: 'none',
                margin: '0 0 10px 0'
            },
            '& svg.button': {
                '&:hover': {
                    cursor: 'pointer'
                }
            }
        }
    }
};
