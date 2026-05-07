import React, { useState, useMemo } from 'react';

// Data
const jobData = [
  {
    id: 1,
    title: "高级前端工程师",
    company: "科技创新有限公司",
    location: "北京",
    salary: "25k-35k",
    category: "技术",
    tags: ["前端开发", "Vue.js", "3 年经验"],
    description: `职位描述：
1. 负责公司核心产品的前端开发工作
2. 参与产品需求分析和技术方案设计
3. 优化前端性能，提升用户体验

任职要求：
1. 本科及以上学历，计算机相关专业
2. 3 年以上前端开发经验
3. 精通 HTML5、CSS3、JavaScript
4. 熟练使用 Vue.js 等前端框架
5. 有良好的代码风格和团队协作能力`
  },
  {
    id: 2,
    title: "产品经理",
    company: "互联网科技有限公司",
    location: "上海",
    salary: "20k-30k",
    category: "产品",
    tags: ["产品设计", "需求分析", "2 年经验"],
    description: `职位描述：
1. 负责产品的规划、设计和迭代
2. 撰写产品需求文档，协调各部门推动项目落地
3. 分析用户数据，优化产品体验`
  },
  {
    id: 3,
    title: "UI 设计师",
    company: "创新设计工作室",
    location: "深圳",
    salary: "15k-25k",
    category: "设计",
    tags: ["UI 设计", "视觉设计", "2 年经验"],
    description: `职位描述：
1. 负责移动端和 Web 端的 UI 设计
2. 制定设计规范，保证设计的一致性
3. 配合开发团队完成界面还原`
  },
  {
    id: 4,
    title: "后端工程师",
    company: "云计算科技",
    location: "北京",
    salary: "30k-45k",
    category: "技术",
    tags: ["Java", "Spring Boot", "5 年经验"],
    description: `职位描述：
1. 负责后端服务的架构设计和开发
2. 解决高并发、高可用等技术难题
3. 编写高质量的技术文档`
  }
];

const IndexPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('全部');
  const [selectedJob, setSelectedJob] = useState<typeof jobData[0] | null>(null);
  const [showDevModal, setShowDevModal] = useState(false);
  
  // Search state that only updates on button click or enter
  const [confirmedSearchTerm, setConfirmedSearchTerm] = useState('');

  const handleSearch = () => {
    setConfirmedSearchTerm(searchTerm);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const filteredJobs = useMemo(() => {
    return jobData.filter(job => {
      // Category filter
      if (activeFilter !== '全部' && job.category !== activeFilter) {
        return false;
      }
      
      // Search filter
      if (confirmedSearchTerm) {
        const term = confirmedSearchTerm.toLowerCase();
        return (
          job.title.toLowerCase().includes(term) ||
          job.company.toLowerCase().includes(term) ||
          job.location.toLowerCase().includes(term)
        );
      }
      
      return true;
    });
  }, [activeFilter, confirmedSearchTerm]);

  const filters = ['全部', '技术', '产品', '设计'];

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* 1. Navigation Bar */}
      <nav id="mainNav" className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:justify-between md:h-16 items-center py-3 md:py-0">
            <div id="siteLogo" className="text-2xl font-bold text-blue-600 flex-shrink-0 mb-3 md:mb-0 md:mr-4 w-full md:w-auto text-center md:text-left">
              智慧招聘
            </div>
            
            <div 
              id="navLinks" 
              className="w-full md:w-auto flex items-center justify-between md:justify-end gap-2 md:gap-8 overflow-x-auto whitespace-nowrap"
            >
              <a 
                href="#" 
                id="navHome" 
                className="text-blue-600 font-medium px-3 py-2 hover:text-blue-800 transition-colors"
                onClick={(e) => { 
                  e.preventDefault();
                }}
              >
                首页
              </a>
              {['职位', '公司', '简历', '消息'].map((item, index) => {
                const ids = ['navJobs', 'navCompanies', 'navResume', 'navMessages'];
                return (
                  <a
                    key={item}
                    href="#"
                    id={ids[index]}
                    className="text-gray-600 hover:text-blue-600 font-medium px-3 py-2 hover:text-blue-800 transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowDevModal(true);
                    }}
                  >
                    {item}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* 2. Main Content */}
      <main id="mainContent" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* 2.1 Search Section */}
        <section id="searchSection" className="mb-8">
          <div id="searchBar" className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <input
                type="text"
                id="searchInput"
                placeholder="搜索职位、公司或地点"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
            <button
              id="searchBtn"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200 shadow-sm"
              onClick={handleSearch}
            >
              搜索
            </button>
          </div>

          <div id="filterTags" className="flex flex-wrap gap-3">
            {filters.map((filter) => {
              const idMap: Record<string, string> = {
                '全部': 'filterAll',
                '技术': 'filterTech',
                '产品': 'filterProduct',
                '设计': 'filterDesign'
              };
              return (
                <button
                  key={filter}
                  id={idMap[filter]}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 ${
                    activeFilter === filter
                      ? 'bg-blue-100 text-blue-700 ring-1 ring-blue-500'
                      : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                  }`}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </section>

        {/* 2.2 Job List */}
        {filteredJobs.length > 0 ? (
          <div id="jobList" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                id={`job-${job.id}`}
                className="job-card bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer animate-fade-in"
                onClick={() => setSelectedJob(job)}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 id={`jobTitle-${job.id}`} className="text-lg font-bold text-gray-900 line-clamp-1">
                    {job.title}
                  </h3>
                  <span id={`jobSalary-${job.id}`} className="text-blue-600 font-bold whitespace-nowrap ml-2">
                    {job.salary}
                  </span>
                </div>
                
                <div className="mb-3">
                  <span id={`companyName-${job.id}`} className="text-gray-700 font-medium mr-3">
                    {job.company}
                  </span>
                  <span id={`jobLocation-${job.id}`} className="text-gray-500 text-sm">
                    {job.location}
                  </span>
                </div>

                <div id={`jobTags-${job.id}`} className="flex flex-wrap gap-2 mt-4">
                  {job.tags.map((tag, index) => (
                    <span
                      key={index}
                      id={`jobTag-${job.id}-${index}`}
                      className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl border border-gray-100 shadow-sm">
            <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-1">未找到相关职位</h3>
            <p className="text-gray-500 text-sm">建议您调整搜索关键词或筛选条件</p>
          </div>
        )}
      </main>

      {/* 3.1 Job Detail Modal */}
      {selectedJob && (
        <div id="jobModal" className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setSelectedJob(null)}>
          <div 
            id="jobModalContent" 
            className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative animate-scale-in"
            onClick={e => e.stopPropagation()}
          >
            <button
              id="jobModalClose"
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              onClick={() => setSelectedJob(null)}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="p-6 md:p-8">
              <div id="jobModalHeader" className="mb-6 border-b border-gray-100 pb-6">
                <h2 id="modalJobTitle" className="text-2xl font-bold text-gray-900 mb-2">
                  {selectedJob.title}
                </h2>
                <div id="modalCompany" className="flex items-center text-gray-600">
                  <span className="font-medium mr-4">{selectedJob.company}</span>
                  <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-sm">
                    {selectedJob.salary}
                  </span>
                </div>
              </div>

              <div id="modalJobDescription" className="prose prose-blue max-w-none text-gray-600 whitespace-pre-wrap">
                {selectedJob.description}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3.2 Dev Hint Modal */}
      <div 
        id="devModal" 
        className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
        style={{ display: showDevModal ? 'block' : 'none' }}
        onClick={() => setShowDevModal(false)}
      >
        <div 
          id="devModalContent" 
          className="bg-white rounded-xl w-full max-w-sm p-6 shadow-2xl text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-scale-in"
          onClick={e => e.stopPropagation()}
        >
          <h3 id="devModalTitle" className="text-xl font-bold text-gray-900 mb-2">
            提示
          </h3>
          <p id="devModalText" className="text-gray-600 mb-6">
            该功能正在开发中，敬请期待...
          </p>
          <button
            id="devModalClose"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200 w-full"
            onClick={() => setShowDevModal(false)}
          >
            确定
          </button>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
