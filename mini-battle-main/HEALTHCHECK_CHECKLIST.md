# Healthcheck Checklist

Checklist này dùng cho Level 1 của lab DevOps. Mục tiêu là biến stack từ "chạy được" thành "biết service nào khỏe, service nào lỗi".

## 1. Endpoint health nên có

Mỗi FastAPI service nên có endpoint:

```text
GET /health
```

Response tối thiểu:

```json
{
  "status": "ok",
  "service": "service-name"
}
```

Với service phụ thuộc MongoDB như `user-service` và `auth-service`, healthcheck nên kiểm tra được kết nối database:

```json
{
  "status": "ok",
  "service": "user-service",
  "dependencies": {
    "mongo": "ok"
  }
}
```

## 2. Danh sách service cần healthcheck

- `api-gateway`: kiểm tra gateway process còn sống.
- `user-service`: kiểm tra process + MongoDB.
- `auth-service`: kiểm tra process + MongoDB.
- `match-service`: kiểm tra process.
- `game-service`: kiểm tra process.
- `chat-service`: kiểm tra process; WebSocket test có thể để smoke test riêng.
- `notification-service`: kiểm tra process.
- `mongo`: dùng healthcheck bằng `mongosh` hoặc lệnh ping tương đương.
- `frontend`: kiểm tra Nginx trả được `/`.

## 3. Docker Compose healthcheck mẫu

FastAPI service:

```yaml
healthcheck:
  test: ["CMD", "python", "-c", "import urllib.request; urllib.request.urlopen('http://localhost:8000/health', timeout=2)"]
  interval: 10s
  timeout: 3s
  retries: 5
  start_period: 10s
```

MongoDB:

```yaml
healthcheck:
  test: ["CMD", "mongosh", "--eval", "db.adminCommand('ping')"]
  interval: 10s
  timeout: 5s
  retries: 5
  start_period: 10s
```

Nginx frontend:

```yaml
healthcheck:
  test: ["CMD", "wget", "-q", "--spider", "http://localhost/"]
  interval: 10s
  timeout: 3s
  retries: 5
  start_period: 10s
```

Lưu ý: image hiện tại của từng service có thể chưa có `curl` hoặc `wget`. Với Python service, cách dùng `python -c` thường ổn định hơn vì đã có Python sẵn trong image.

## 4. Smoke test sau khi stack lên

Chạy các bước sau sau mỗi lần deploy/rebuild:

```bash
docker compose ps
```

```bash
curl -f http://localhost:8000/users/health
curl -f http://localhost:8000/auth/health
curl -f http://localhost:8000/match/health
curl -f http://localhost:8000/game/health
curl -f http://localhost:8000/notify/health
```

Sau khi thêm route chat qua gateway:

```bash
curl -f http://localhost:8000/chat/health
```

API nghiệp vụ tối thiểu:

```bash
curl -f -X POST "http://localhost:8000/users/register" \
  -H "Content-Type: application/json" \
  -d '{"username":"health-demo","password":"demo123"}'
```

```bash
curl -f -X POST "http://localhost:8000/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"username":"health-demo","password":"demo123"}'
```

## 5. Tiêu chí pass

- `docker compose ps` hiển thị các service chính là `healthy`.
- Gateway route được tới tất cả service HTTP.
- Register/login chạy được sau khi restart stack.
- Khi kill một service, health chuyển sang unhealthy hoặc container restart theo policy.
- Khi Mongo down, `user-service` hoặc `auth-service` phản ánh dependency lỗi.

## 6. Bài tập mở rộng

- Thêm `/ready` để phân biệt service sống và service sẵn sàng nhận traffic.
- Thêm request ID vào response/log để debug nhanh hơn.
- Viết script `smoke-test.sh` hoặc `smoke-test.ps1`.
- Thêm alert sau này: service down, high 5xx, latency cao, Mongo unavailable.
