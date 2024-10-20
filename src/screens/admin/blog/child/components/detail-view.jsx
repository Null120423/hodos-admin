function DetailView({data}) {
    return <div className="flex flex-col gap-2">
       <img src={data.thumbnail} alt={data.title} className="w-full h-96 object-cover" />
        <div className="flex">
            {data.tags?.split(',').map((tag, index) => (
                <span key={index} className="bg-gray-200 p-2 rounded-md mr-2">
                    {tag}
                </span>
            ))}
            </div>
        <div dangerouslySetInnerHTML={{ __html: data.content }}></div>
    </div>
}

export default DetailView;