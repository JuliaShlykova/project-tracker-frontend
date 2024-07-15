import classNames from 'classnames';
import React, { useEffect, useMemo, useState } from 'react'
import fromISODateToLocale from '../../utils/fromISODateToLocale';

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

const DateAndTimer = ({done, dueDate}) => {
  const parsedDeadline = useMemo(() => Date.parse(dueDate), [dueDate]);
  const [total, setTotal] = useState(parsedDeadline - Date.parse(new Date()))

  useEffect(() => {
    const interval = setInterval(
      () => {
        setTotal(parsedDeadline - Date.parse(new Date()))
      },
      MINUTE
    );

    return () => clearInterval(interval)
  }, [parsedDeadline]);

  return (
    <>
      <td className={classNames({
        'bg-danger-subtle': (!done)&&(total<=0), 
        'bg-warning-subtle': (!done)&&(total>0)&&(total< 1 * DAY)})}
      >{fromISODateToLocale(dueDate)}</td>
      <td className='d-none d-md-table-cell'>
      {
        (total<=0)
        ?'0 seconds left'
        :((Math.floor(total/DAY)>0)
          ?`${Math.floor(total/DAY)} days ${Math.floor((total/HOUR) % 24)} hours left`
          :`${Math.floor((total/HOUR) % 24)} hours ${Math.floor((total/MINUTE) % 60)} minutes left`)
      }
      </td>
    </>
  )
}

export default DateAndTimer