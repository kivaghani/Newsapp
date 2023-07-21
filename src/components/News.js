import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroller'


const News = (props) => {
   const [articles, setArticles] = useState([])

   const [page, setPage] = useState(1)
   const [totalResults, setTotalResults] = useState(0)

  // capitalizeFirstLetter = (string)=>{
  //   return string.charAt(0).toUpperCase() + string.slice(1);
  // }
  

  // constructor(props){
  //   super(props); 
  //   // this.state={
  //   //    articles :[],
  //   //    loading : false,
  //   //    page : 1,
  //   //    totalResults : 0
  //   // }
  //   // document.title = `${this.capitalizeFirstLetter(props.catagory)} - NewsMonkey`;
  // }


  const updateNews = async ()=> {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=7cb4439db96b495eaad9f2925323aeab&page=${page}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json()
    setArticles( parsedData.articles)
    setTotalResults(parsedData.totalResults)
  }

   useEffect(() => {
       updateNews();
   }, [])


    const fetchMoreDate = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=7cb4439db96b495eaad9f2925323aeab&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1)
    let data = await fetch(url);
    let parsedData = await data.json()
    setArticles( articles.concat(parsedData.articles))
    setTotalResults( parsedData.totalResults)
    console.log(parsedData);
 };


    return (
      <div className="container my-3  ">
        <h1 className="text-center" style={{margin: '34px 0px', marginTop:'90px'}}>News Star - Top Headlines</h1> 
        {/* {this.state.loading && <Spinner/>} */}
        <InfiniteScroll
        pageStart={0}
        dataLength = {articles.length}
        next = {fetchMoreDate} 
        hasMore={articles.length !== totalResults}
        // loader={<h4>Loading..</h4>}
    
    >
         <div className="container">
        <div className="row">
        {articles.map((element)=>{
           return <div className="col-md-4" key={element.url}>
          <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} 
          imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
          </div>
        })}
        </div>
        </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button disabled={this.state.page<=1}type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/props.pageSize)}type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}
      </div>
    )
  }

News.defaultProps = {
  country : 'in',
  pageSize : 8,
  category : 'general',
}

News.propTypes = {
  country : PropTypes.string,
  pageSize : PropTypes.number,
  category : PropTypes.string,
}

export default News