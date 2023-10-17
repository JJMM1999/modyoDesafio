export const getImages =() =>{

    const [images, setImages] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Realiza una solicitud GET a la URL de las imágenes
        axios
            .get(
                'https://fed-team.modyo.cloud/api/content/spaces/animals/types/game/entries?per_page=20'
            )
            .then((response) => {
                // Si la solicitud es exitosa, actualiza el estado con las imágenes
                setImages(response.data.entries);
            })
            .catch((err) => {
                // Si hay un error, registra el error en el estado
                setError(err);
            });
    }, []);

    const imgs = images.flatMap(item => [item, item]).sort(() => Math.random() - 0.5);
}