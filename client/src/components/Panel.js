import * as React from 'react';
import { useEffect, useState } from 'react';
import { listLogEntries } from '../api';
import { Dropdown } from 'semantic-ui-react';

const API_URL = process.env.REACT_APP_API_URL;

function Panel(props) {

    const getEntries = async () => {
        const logEntries = await listLogEntries();
        setLogEntries(logEntries);
    };

    useEffect(() => {
        getEntries();
    }, []);

    const [logEntries, setLogEntries] = useState([]);

    return (
        <div className="panel">
            <h3>Log Entries</h3>

            <hr />


            {logEntries.map(entry => (
                console.log(props.onSelectEntries(entry)),
                <React.Fragment key={entry._id}>

                    <div key={`btn-${entry._id}`} className="input">
                        <input
                            type="button"
                            name="entries"
                            id={`entry-${entry._id}`}
                            onClick={() => props.onSelectEntries(entry)}
                            value = {entry.title}
                        />
                        <label htmlFor={`entry-${entry._id}`}> {entry.tags}</label>
                    </div>
                </React.Fragment>
            ))
            }
        </div>
    );
}

export default React.memo(Panel);