# 智慧招聘前端项目

这是一个使用 React + TypeScript + Tailwind CSS 构建的现代化招聘网站前端项目。
该项目实现了职位搜索、筛选、查看详情等功能，界面美观，响应式设计兼容 PC 和移动端。

## 项目结构

- `frontend/`: 前端源代码目录
- `docker-compose.yml`: Docker 编排文件
- `README.md`: 项目说明文档

## 功能特性

1.  **职位浏览**: 展示职位列表，包含职位名称、薪资、公司、地点和标签。
2.  **搜索功能**: 支持按职位名称、公司名称或地点进行搜索。
3.  **筛选功能**: 支持按职位类别（技术、产品、设计）进行筛选。
4.  **职位详情**: 点击职位卡片可查看详细的职位描述。
5.  **响应式布局**: 完美适配桌面端和移动端设备。
6.  **开发提示**: 点击导航链接会显示"功能开发中"的提示。

## 启动指南

### 方式一：Docker 启动（推荐）

本项目使用 Docker 容器化部署，请确保您的系统已安装 Docker 和 Docker Compose。

在项目根目录下执行以下命令以构建并启动服务：

```bash
docker-compose up -d --build
```

### 方式二：本地开发启动 (npm)

如果需要在本地开发调试，请确保已安装 Node.js。

1.  进入前端目录：
    ```bash
    cd frontend
    ```

2.  安装依赖：
    ```bash
    npm install
    ```

3.  启动开发服务器：
    ```bash
    npm run dev
    ```

### 访问项目

无论是 Docker 还是 npm 启动，服务均默认运行在 3000 端口：

http://localhost:3000

## 开发环境

- Node.js
- React 19
- Vite
- Tailwind CSS v4

## 注意事项

- 前端服务默认运行在 3000 端口。
- 如需停止服务，请运行 `docker-compose down`。
