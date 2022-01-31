import React, { Component } from 'react';
import NewsItem from './NewsItem';

export class News extends Component {


    constructor() {
        super();

        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: null
        }


    }

    async componentDidMount() {

        let Url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=bffcbad897ac43dca6c323d4da66e9d7&page=1&pageSize=20";
        let data = await fetch(Url);
        let parsedData = await data.json();
        this.setState({ articles: parsedData.articles , totalResults: parsedData.totalResults});
    }

    handlePrevClick = async () => {
        let Url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=bffcbad897ac43dca6c323d4da66e9d7&page=${this.state.page - 1}&pageSize=20`;
        let data = await fetch(Url);
        let parsedData = await data.json();


        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles

        })

    }
    handleNextClick = async () => {

        if (this.state.page + 1 > Math.ceil(this.state.totalResults / 20)) {

        }
        else {

            let Url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=bffcbad897ac43dca6c323d4da66e9d7&page=${this.state.page + 1}&pageSize=20`;
            let data = await fetch(Url);
            let parsedData = await data.json();


            this.setState({
                page: this.state.page + 1,
                articles: parsedData.articles
            })
        }
    }

    render() {
        return (
            <div>
                <div className="container my-3">

                    <h2 className="my-4">NewsMonkey Top Headlines</h2>
                    <div className="my-4">

                        <div className="row">
                            {this.state.articles.map((element, index) => {


                                return <div className="col-md-4 my-3" key={element.url}>
                                    <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} />
                                </div>

                            })}
                        </div>

                    </div>



                </div>
                <div className="container my-3 d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark mx-2" onClick={this.handlePrevClick}> &larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / 20)} type="button" className="btn btn-primary mx-2" onClick={this.handleNextClick}> Next &rarr;</button>
                </div>

            </div>
        );
    }
}

export default News;
