import { Link } from "react-router-dom";

const Card = ({ post }) => {
  return (
    <article
      className="rounded-xl shadow-md hover:shadow-xl transform hover:scale-[1.03] transition-transform duration-300 cursor-pointer
        bg-[#fff0f5] dark:bg-[#3e2c3d]"
    >
      <img src={post.imageUrl} alt={post.title} className="w-full h-48 object-cover rounded-t-xl" loading="lazy" />
      <div className="p-5">
        <h2 className="text-[#7d4f57] dark:text-[#f3d4de] text-xl font-semibold mb-1 truncate" title={post.title}>
          {post.title}
        </h2>
        <p className="text-[#a87e8e] dark:text-[#d9b8c4] text-sm mb-2">
          {new Date(post.date).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
        <p className="text-[#6a4a5b] dark:text-[#e7d4db] mb-4 line-clamp-2">{post.excerpt}</p>

        <Link to={`/newsdetail/${post.id}`} className="inline-block text-[#d6336c] dark:text-[#f76c6c] font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-[#f76c6c] rounded" aria-label={`Read more about ${post.title}`}>
          Read More →
        </Link>
      </div>
    </article>
  );
};

export default Card;
