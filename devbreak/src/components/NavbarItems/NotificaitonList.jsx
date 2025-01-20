import { useEffect, useState } from 'react';
import getNotice from '../../APIs/get/getNotice';

export default function NotificaitonList() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await getNotice();
        const sortedData = data
          .sort((a, b) => new Date(b.time) - new Date(a.time)) // 최신순으로 정렬
          .slice(0, 4); // 최신 4개

        const formattedNotifications = sortedData.map((notice) => {
          let message = '';
          switch (notice.type) {
            case "블로그 초대":
              message = `${notice.instigator} invited you to join the blog '${notice.relatedId.blogId}'.`;
              break;
            case "블로그 즐겨찾기":
              message = `${notice.instigator} added blog '${notice.relatedId.blogId}' to their favorites.`;
              break;
            case "글 좋아요":
              message = `${notice.instigator} liked your article '${notice.relatedId.articleId}'.`;
              break;
            default:
              message = `${notice.instigator} sent you a new notification.`;
              break;
          }

          return {
            ...notice,
            message,
          };
        });

        setNotifications(formattedNotifications);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  return notifications;
}
