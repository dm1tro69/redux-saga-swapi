import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectPeople} from "../redux/reducers/people/selectors";
import PeoplePagePagination from "./PeoplePagePagination";
import {LOAD_USERS} from "../redux/reducers/people/actions";
import {Link} from "react-router-dom";

const PeopleTable = () => {
    const people = useSelector(selectPeople);

    const dispatch = useDispatch()

    const changePage = (newPage) => dispatch({type: LOAD_USERS, payload:{page: newPage, search: people.search}})

    const search = (e) => {
        return dispatch({type: LOAD_USERS, payload: {page: 1, search: e.target.value}})
    }

    return (

            <>
                <h1> Star Wars People</h1>

                <form style={{display: 'inline-block'}}>
                    <input style={{padding: '12px 20px'}} type="text" value={people.search} onChange={search} placeholder={'Search People'}/>
                </form>

                {people.loading ? (
                    <div>Loading...</div>
                ): (
                    <>
                    <table border={1} width={'100%'} cellPadding={2} cellSpacing={0}>
                        <thead>
                        <tr>
                            <th>name</th>
                            <th>birth_year</th>
                            <th>eye_color</th>
                            <th>gender</th>
                            <th>hair_color</th>
                            <th>height</th>
                            <th/>
                        </tr>
                        </thead>
                        <tbody>
                        {people?.data?.results.map((person) => {

                            const id = person.url.replaceAll(/\D/g, '')

                            return (
                                <tr key={person.edited}>
                                    <td>{person.name}</td>
                                    <td>{person.birth_year}</td>
                                    <td>{person.eye_color}</td>
                                    <td>{person.gender}</td>
                                    <td>{person.hair_color}</td>
                                    <td>{person.height}</td>
                                    <td>
                                        <Link to={`/people/${id}`}>Details</Link>
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                        <PeoplePagePagination page={people.page} total={people.data.count} onChange={changePage}/>
                    </>

                )}


            </>

    );
};

export default PeopleTable;
