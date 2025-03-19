import './Details.scss'
import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AccountContext } from "../../App";
import { toast } from 'react-toastify';


function Details() {
	const { id } = useParams()
	const [movie, setMovie] = useState({})
	const [reviews, setReviews] = useState([])
	const [review, setReview] = useState({})
	const { account } = useContext(AccountContext);
	const [accounts, setAccounts] = useState()
	const navigate = useNavigate()

	let setView = {}
	if (account === undefined || account === null) {
		setView.display = "none";
	}

	useEffect(() => {
		fetch("http://localhost:8000/account")
			.then(response => response.json())
			.then(data => setAccounts(data))
	}, [])

	useEffect(() => {
		fetch(`http://localhost:8000/movies/${id}`, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		})
			.then(response => response.json())
			.then(movie => {
				setMovie(movie)
			})

		fetch(`http://localhost:8000/reviews?movie_id=${id}`, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		})
			.then(response => response.json())
			.then(reviews => {
				setReviews(reviews)
				const currentReview = reviews.find(rv => rv.user_id === account.id)
				setReview(currentReview)
			})

	}, [id])

	useEffect(() => {
		if (reviews.length > 0) {
			const score = reviews.reduce((total, rv) => {
				return total + parseFloat(rv.star);
			}, 0)
			const averageScore = (Math.round(score / reviews.length * 100) / 100).toFixed(1);;
			const editMovie = { ...movie, score: averageScore }
			setMovie(editMovie);
			fetch(`http://localhost:8000/movies/${movie.id}`, {
				method: "PUT",
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(editMovie)
			})
		}else{
			const editMovie = { ...movie, score: 'N/A' }
			setMovie(editMovie);
			fetch(`http://localhost:8000/movies/${movie.id}`, {
				method: "PUT",
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(editMovie)
			})
		}

	}, [reviews])

	const handleChange = (e) => {
		const { value, name } = e.target;
		setReview(
			{ ...review, [name]: value }
		)
	}
	const handleAdd = () => {
		if (checkEmpty(review?.star, review?.content) && checkFloat(review?.star)) {
			let method = "";
			let url = ""
			const newReview = {
				...review,
				user_id: account.id,
				movie_id: id
			}
			const currentReview = reviews.find(rv => rv.user_id === account.id)

			if (currentReview === undefined) {
				method = "POST"
				url = ""
				setReviews([...reviews, newReview]);
				console.log(newReview);
			} else {
				method = "PUT"
				url = `/${review.id}`
				const newReviews = reviews.map(rv => {
					if (rv.id !== currentReview.id) {
						return rv
					} else {
						return newReview
					}
				})
				setReviews(newReviews)
			}
			fetch(`http://localhost:8000/reviews${url}`, {
				method: method,
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(newReview)
			})
		}

	}

	const checkEmpty = (...param) => {
		for (let index = 0; index < param.length; index++) {
			const element = param[index];
			if (element === undefined || element.trim() === '') {
				toast("Bình luận và điểm đánh giá không được để trống.")
				return false;
			}
		}
		return true;
	}

	const checkFloat = (number) => {
		const numberFloat = parseFloat(number)
		if (!isNaN(numberFloat) && typeof (numberFloat) === 'number' && numberFloat >= 0 && numberFloat <= 10) {
			return true;
		} else {
			toast("Điểm đánh giá phải từ 0 đến 10");
			return false;
		}
	}

	const handleWatch = (id) => {
		navigate(`/watch/${id}`)
	}

	return (
		<div className='container'>
			<div className='row'>
				<div className='col-sm-12'>
					<div className='row'>
						<div className='col-sm-4'>
							<img src={movie.imageUrl} alt={movie.name} width="auto" height="500px" style={{ maxWidth: "370px" }} />
						</div>
						<div className='col-sm-8'>
							<div className='row'>
								<h1 className='col-sm-12'>{movie.name}</h1>
								<div className='col-sm-12'><span style={{ fontWeight: 'bold' }}>Thể loại: </span>{movie.type}</div>
								<div className='col-sm-12'><span style={{ fontWeight: 'bold' }}>Điểm đánh giá:</span> {movie.score}</div>
								<div className='col-sm-12'><span style={{ fontWeight: 'bold' }}>Mô tả:</span> {movie.description}</div>
								<button onClick={() => handleWatch(movie.id)}>Xem Phim</button>
							</div>
							<hr style={setView} />
							<div className='row' style={setView}>
								<div className='col-sm-12'>
									<span>Điểm đánh giá: </span>
									<input type="text" name="star" value={review?.star || ''} onChange={handleChange} />
								</div>
								<div className='col-sm-12'>
									<span>Bình luận:</span>
									<br />
									<textarea rows={4} cols={98} name="content" value={review?.content || ''} onChange={handleChange}></textarea>
								</div>
								<button className='btn btn-primary ml-3' onClick={() => handleAdd()}>Đánh giá</button>
							</div>
							<hr />
							<div className='row'>
								<h2 className='col-sm-12'>Bình luận</h2>
								{reviews.length > 0 ? reviews.map(rv => (
									<div className='col-sm-12' key={rv.id}>
										<span
											style={{ fontWeight: 'bold' }}
											className="col-sm-4"
										>
											{accounts.find(a => a.id === rv.user_id).name}:
										</span>
										<span className='col-sm-8'>
											{rv.content}
										</span>
									</div>
								)) : <span className='col-sm-12'>Chưa có bình luận nào</span>}
							</div>
						</div>
					</div>

				</div>
			</div>
		</div>
	)
}

export default Details