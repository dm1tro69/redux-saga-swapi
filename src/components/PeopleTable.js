import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {selectPeople} from "../redux/reducers/people/selectors";
import PeoplePagePagination from "./PeoplePagePagination";
import {LOAD_USERS} from "../redux/reducers/people/actions";

const PeopleTable = () => {
    const people = useSelector(selectPeople);

    const dispatch = useDispatch()

    const changePage = (newPage) => dispatch({type: LOAD_USERS, payload:{page: newPage, search: people.search}})

    return (

            <>
                <h1> Star Wars People</h1>

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
                        </tr>
                        </thead>
                        <tbody>
                        {people?.data?.results.map((person) => {
                            return (
                                <tr key={person.edited}>
                                    <td>{person.name}</td>
                                    <td>{person.birth_year}</td>
                                    <td>{person.eye_color}</td>
                                    <td>{person.gender}</td>
                                    <td>{person.hair_color}</td>
                                    <td>{person.height}</td>
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
