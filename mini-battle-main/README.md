# Deploy applications:
```
docker compose up -d --build
```

# Mô hình application :
```mermaid
flowchart LR
    C[🧑‍💻 Client<br/>/users/profile] --> FE[🌐 Frontend NGINX]

    FE -->|proxy_pass /users/...| GW[🚪 API Gateway Python<br/>FastAPI Reverse Proxy]

    subgraph GATEWAY[🚪 API GATEWAY TỰ VIẾT]
        DIR[📌 Path mapping logic<br/>/svc/path → svc-service:8000]
    end

    GW --> DIR

    DIR -->|svc = users<br/>→ http://user-service:8000/profile| US[🗄️ user-service<br/>10.100.1.101:8001]

    US --> GW --> FE --> C

```
Cứ mỗi 15 giây, Prometheus sẽ tự chạy đi kéo dữ liệu từ Node Exporter và cAdvisor về
<img width="2088" height="1328" alt="image" src="https://github.com/user-attachments/assets/fb58327b-32c5-4abb-8303-e8c58458a1a8" />
<img width="2096" height="1332" alt="image" src="https://github.com/user-attachments/assets/a82d59e8-227f-4740-ac60-c5e183457458" />
Uptime Kuma liên tục ping vào link http://10.1.10.23:3000 (Frontend) cứ mỗi 1 phút.
docker stop minibattle-frontend-1 - Kuma phát hiện dịch vụ sập - Ngay lập tức gửi cảnh báo đến điện thoại qua Telegram Bot.
<img width="2512" height="1320" alt="image" src="https://github.com/user-attachments/assets/fb6e1cab-a218-4ca8-be1b-11a4135d0ed0" />
<img width="810" height="596" alt="image" src="https://github.com/user-attachments/assets/590f68e9-8fd9-43dd-96ca-bbaa2b27d9dc" />
