import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import getNotice from '../../APIs/get/getNotice';
import getBlogBlogId from '../../APIs/get/getBlogBlogId';
import getArticleArticleId from '../../APIs/get/getArticleArticleId';

export default function NotificationList() {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await getNotice();
        const sortedData = data.sort((a, b) => new Date(b.time) - new Date(a.time)); // 최신순으로 정렬

        const formattedNotifications = await Promise.all(
          sortedData.map(async (notice) => {
            let message = '';
            let blogName = '';
            let articleTitle = '';

            if (notice.type === "블로그 초대" || notice.type === "블로그 즐겨찾기") {
              try {
                const blogData = await getBlogBlogId(notice.relatedId.blogId);
                blogName = blogData.blog_name;
              } catch (error) {
                console.error('Failed to fetch blog name:', error);
              }
            }

            if (notice.type === "글 좋아요") {
              try {
                const articleData = await getArticleArticleId(notice.relatedId.articleId);
                articleTitle = articleData.title;
              } catch (error) {
                console.error('Failed to fetch article title:', error);
              }
            }

            switch (notice.type) {
              case "블로그 초대":
                message = `${notice.instigator} invited you to join the blog '${blogName}'.`;
                break;
              case "블로그 즐겨찾기":
                message = `${notice.instigator} added blog '${blogName}' to their favorites.`;
                break;
              case "글 좋아요":
                message = `${notice.instigator} liked your article '${articleTitle}'.`;
                break;
              default:
                message = `${notice.instigator} commented on your article '${articleTitle}'.`;
                break;
            }

            return {
              ...notice,
              message,
            };
          })
        );

        setNotifications(formattedNotifications);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  return notifications;
}
