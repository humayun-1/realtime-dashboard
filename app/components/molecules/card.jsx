import React from 'react'

const Card = ({ data }) => {
    return (
        <div className='border p-4 flex flex-col gap-4 shadow rounded-xl'>
            <div className='flex items-center gap-3 justify-between'>
                <div>{data.title}</div>
                <div>{data.icon}</div>
            </div>
            <div>
                <h1 className='font-bold text-lg'>
                    {data.value}
                </h1>
                <p className='text-xs text-gray-700'>+180.1% from last month</p>
            </div>
        </div>
    )
}

export default Card