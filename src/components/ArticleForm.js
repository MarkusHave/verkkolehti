import React, { Component } from 'react';
import axios from 'axios';

export default class ArticleForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            newCategory: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.addNewCategory = this.addNewCategory.bind(this);
        this.getData = this.getData.bind(this);
        this.delCategory = this.delCategory.bind(this);
    }

    handleChange(event) {
        this.setState({ newCategory: event.target.value });
    }

    addNewCategory(event) {
        event.preventDefault();
        axios
            .post('/categories', {
                category_name: this.state.newCategory
            })
            .then((res) => {
                // console.log(`Added new category! ${response}`);
                alert(`Added new category: ${this.state.newCategory}`);
                this.refs.txtCategory.value = '';
                this.getData();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    delCategory(index) {
        console.log(index);
        // axios
        //     .delete(`/categories/${index}`)
        //     .then((response) => {
        //         console.log(response);
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     });
    }

    getData() {
        axios.get('/categories').then((res) => {
            this.setState({ categories: res.data });
        });
    }

    componentDidMount() {
        this.getData();
    }

    render() {
        return (
            <div>
                <h1>New article</h1>
                <form action="articles" method="post">
                    <div>
                        <label>Article title: </label>
                        <br />
                        <input type="text" name="title" />
                    </div>
                    <div>
                        <label>Category:</label>
                        <br />
                        <select name="category_id">
                            {this.state.categories.map((item, index) => {
                                return (
                                    <option key={index} value={item.category_id}>
                                        {item.category_name}
                                    </option>
                                );
                            })}
                        </select>
                        <br />
                        <label>Add new gategory: </label>
                        <br />
                        <input ref="txtCategory" type="text" onInput={this.handleChange} />
                        <input type="button" value="Add" onClick={this.addNewCategory} />
                    </div>
                    <div>
                        <label>Article content: </label>
                        <br />
                        <textarea name="text" cols="60" rows="10" />
                    </div>
                    <div>
                        <input type="submit" value="Send" />
                    </div>
                </form>
            </div>
        );
    }
}
