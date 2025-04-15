import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';

// Component Modal để hiển thị preview
const PreviewModal = ({ isOpen, onClose, file }) => {
  if (!isOpen) return null;

  const corsProxyUrl = 'https://proxy.corsfix.com/?';
  const documents = file.url
    ? [
        {
          uri: corsProxyUrl + encodeURIComponent(file.url),
          fileName: file.title,
        },
      ]
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-4xl max-h-screen overflow-hidden bg-white rounded-lg shadow-xl p-1">
        <div className="flex justify-between items-center p-2 border-b">
          <h3 className="text-lg font-semibold">{file.title}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="h-[70vh] overflow-auto">
          {file.url ? (
            <DocViewer
              documents={documents}
              pluginRenderers={DocViewerRenderers}
              config={{
                header: {
                  disableHeader: true,
                  disableFileName: true,
                  retainURLParams: true,
                },
              }}
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">Không có URL file để xem trước</p>
            </div>
          )}
        </div>

        <div className="p-4 border-t flex justify-between">
          <span className="text-sm text-gray-500">
            {file.type} · {file.size}
          </span>
          <a
            href={file.url}
            download={file.title}
            className="rounded-full bg-orange-500 px-4 py-1 text-sm text-white hover:bg-orange-600"
          >
            Tải xuống
          </a>
        </div>
      </div>
    </div>
  );
};

const MaterialDetail = () => {
  const { materialId } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [materialData, setMaterialData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Dữ liệu mẫu cho tất cả các tài liệu
  const materialsDatabase = [
    {
      id: 1,
      title: 'Academic Writing Structure Guide',
      description:
        'A comprehensive guide to structuring academic essays, research papers, and dissertations. This guide covers everything from creating effective introductions to crafting compelling conclusions. It provides detailed examples of well-structured academic papers across various disciplines and explains the key components that make them successful.',
      type: 'PDF',
      category: 'writing',
      size: '2.4 MB',
      date: 'Updated 15/03/2025',
      url: 'https://pdf.bankexamstoday.com/raman_files/Error_Spotting_rules_blogger.pdf',
      pages: 45,
      author: 'Dr. Emily Johnson',
      publisher: 'Academic Resources Institute',
      publicationYear: '2024',
      language: 'English',
      keywords: [
        'academic writing',
        'essay structure',
        'research papers',
        'dissertation',
      ],
      rating: 4.7,
      downloads: 1256,
      views: 3842,
      content: [
        {
          section: 'Introduction to Academic Writing',
          pages: '1-5',
          topics: [
            'Defining academic writing',
            'Importance of structure',
            'Common structural elements',
          ],
        },
        {
          section: 'Research Paper Structure',
          pages: '6-15',
          topics: [
            'Title page formatting',
            'Abstract writing',
            'Literature review organization',
            'Methodology section',
            'Results presentation',
            'Discussion structure',
          ],
        },
        {
          section: 'Essay Structure',
          pages: '16-25',
          topics: [
            'Introduction strategies',
            'Thesis statement development',
            'Body paragraph structure',
            'Transition techniques',
            'Conclusion methods',
          ],
        },
        {
          section: 'Dissertation Structure',
          pages: '26-35',
          topics: [
            'Front matter',
            'Chapter organization',
            'Bibliography formatting',
            'Appendix usage',
          ],
        },
        {
          section: 'Common Structural Issues',
          pages: '36-42',
          topics: [
            'Organizational problems',
            'Flow and coherence',
            'Balance and proportion',
            'Structural editing techniques',
          ],
        },
        {
          section: 'Resources and Templates',
          pages: '43-45',
          topics: [
            'Structure templates',
            'Further reading',
            'Online resources',
          ],
        },
      ],
      reviews: [
        {
          user: 'Robert Chen',
          date: '12/02/2025',
          rating: 5,
          comment:
            'Extremely helpful resource! The templates saved me hours of work on my dissertation.',
        },
        {
          user: 'Maria Garcia',
          date: '05/01/2025',
          rating: 4,
          comment:
            'Well-organized and comprehensive. Would benefit from more examples in the humanities.',
        },
        {
          user: 'James Wilson',
          date: '20/12/2024',
          rating: 5,
          comment:
            'Perfect guide for my research methods class. Clear explanations and practical advice.',
        },
      ],
    },
    {
      id: 2,
      title: 'Academic Vocabulary List',
      description:
        'Essential vocabulary for academic writing and speaking, with examples in context. This comprehensive glossary includes over 500 key academic terms with definitions, usage examples, and synonyms to help improve your academic language proficiency.',
      type: 'DOC',
      category: 'vocabulary',
      size: '1.8 MB',
      date: 'Updated 20/02/2025',
      url: 'https://example-storage.com/files/academic-vocabulary.docx',
      pages: 32,
      author: 'Prof. Michael Green',
      publisher: 'Language Learning Press',
      publicationYear: '2024',
      language: 'English',
      keywords: [
        'academic vocabulary',
        'academic language',
        'writing skills',
        'speaking skills',
      ],
      rating: 4.9,
      downloads: 2105,
      views: 5230,
      content: [
        {
          section: 'Introduction to Academic Vocabulary',
          pages: '1-3',
          topics: [
            'Importance of academic vocabulary',
            'Research on vocabulary acquisition',
            'How to use this guide',
          ],
        },
        {
          section: 'Research Terminology',
          pages: '4-10',
          topics: [
            'Research methodology terms',
            'Data analysis vocabulary',
            'Statistical terminology',
          ],
        },
        {
          section: 'Writing & Argumentation',
          pages: '11-17',
          topics: [
            'Transition words and phrases',
            'Argumentative vocabulary',
            'Comparison and contrast terms',
          ],
        },
        {
          section: 'Disciplinary Vocabulary',
          pages: '18-25',
          topics: [
            'STEM vocabulary',
            'Humanities terminology',
            'Social sciences language',
          ],
        },
        {
          section: 'Practical Application',
          pages: '26-30',
          topics: [
            'Vocabulary usage examples',
            'Common mistakes',
            'Self-study exercises',
          ],
        },
        {
          section: 'Resources',
          pages: '31-32',
          topics: ['Additional vocabulary resources', 'Recommended reading'],
        },
      ],
      reviews: [
        {
          user: 'Sarah Thompson',
          date: '18/03/2025',
          rating: 5,
          comment:
            'An invaluable resource for non-native English speakers in academia. The context examples are particularly helpful.',
        },
        {
          user: 'Alex Patel',
          date: '24/02/2025',
          rating: 5,
          comment:
            'I use this with all my international students. The disciplinary sections are particularly well-organized.',
        },
        {
          user: 'Lisa Wong',
          date: '10/01/2025',
          rating: 4,
          comment:
            'Great resource, though I wish it had a pronunciation guide for difficult terms.',
        },
      ],
    },
    {
      id: 3,
      title: 'Lecture Comprehension Strategies',
      description:
        'Techniques for effective note-taking and comprehension during academic lectures. This guide provides practical approaches to improve your ability to understand, retain, and synthesize information presented in university lectures.',
      type: 'PDF',
      category: 'listening',
      size: '3.1 MB',
      date: 'Updated 05/01/2025',
      url: 'https://example-storage.com/files/lecture-strategies.pdf',
      pages: 28,
      author: 'Dr. Thomas Rodriguez',
      publisher: 'Academic Success Publications',
      publicationYear: '2024',
      language: 'English',
      keywords: [
        'note-taking',
        'lectures',
        'academic listening',
        'comprehension',
      ],
      rating: 4.6,
      downloads: 978,
      views: 2310,
      content: [
        {
          section: 'Understanding the Lecture Environment',
          pages: '1-4',
          topics: [
            'Types of academic lectures',
            'Lecturer styles',
            'Physical and digital lecture environments',
          ],
        },
        {
          section: 'Preparation Strategies',
          pages: '5-8',
          topics: [
            'Pre-lecture reading',
            'Reviewing prior knowledge',
            'Setting learning goals',
          ],
        },
        {
          section: 'Note-Taking Methods',
          pages: '9-16',
          topics: [
            'Cornell method',
            'Mind mapping',
            'Outline method',
            'Digital note-taking tools',
          ],
        },
        {
          section: 'Active Listening Techniques',
          pages: '17-22',
          topics: [
            'Identifying key points',
            'Recognizing signpost language',
            'Managing attention spans',
          ],
        },
        {
          section: 'Post-Lecture Processing',
          pages: '23-26',
          topics: [
            'Review strategies',
            'Connecting to other course material',
            'Creating summary notes',
          ],
        },
        {
          section: 'Resources',
          pages: '27-28',
          topics: ['Recommended apps and tools', 'Further reading'],
        },
      ],
      reviews: [
        {
          user: 'David Wang',
          date: '21/03/2025',
          rating: 5,
          comment:
            'This guide completely transformed how I approach lectures. My comprehension and retention have significantly improved.',
        },
        {
          user: 'Emma Johnson',
          date: '03/02/2025',
          rating: 4,
          comment:
            'Very practical advice, especially the digital note-taking section. Would recommend for all university students.',
        },
        {
          user: 'Nathan Smith',
          date: '12/12/2024',
          rating: 5,
          comment:
            'The Cornell method explanation alone was worth downloading this guide. Excellent resource!',
        },
      ],
    },
    {
      id: 4,
      title: 'Academic Presentation Templates',
      description:
        'Professional templates for academic presentations with guidance on structure and delivery. This collection includes customizable slides for research presentations, thesis defenses, conference talks, and classroom presentations.',
      type: 'PPT',
      category: 'speaking',
      size: '5.6 MB',
      date: 'Updated 10/12/2024',
      url: 'https://example-storage.com/files/presentation-templates.pptx',
      pages: 52,
      author: 'Prof. Amanda Brown',
      publisher: 'Academic Communication Center',
      publicationYear: '2024',
      language: 'English',
      keywords: ['presentations', 'slides', 'academic speaking', 'conferences'],
      rating: 4.8,
      downloads: 3120,
      views: 7450,
      content: [
        {
          section: 'Presentation Fundamentals',
          pages: '1-6',
          topics: [
            'Understanding your audience',
            'Setting objectives',
            'Time management',
            'Visual principles',
          ],
        },
        {
          section: 'Research Presentation Templates',
          pages: '7-20',
          topics: [
            'Introduction slides',
            'Literature review formats',
            'Methodology visualization',
            'Results presentation',
            'Discussion frameworks',
          ],
        },
        {
          section: 'Conference Talk Templates',
          pages: '21-30',
          topics: [
            'Short form presentations (5-10 min)',
            'Standard presentations (15-20 min)',
            'Plenary presentation formats',
          ],
        },
        {
          section: 'Thesis Defense Templates',
          pages: '31-40',
          topics: [
            'Comprehensive defense structures',
            'Committee-focused slides',
            'Research journey narratives',
          ],
        },
        {
          section: 'Classroom Presentation Templates',
          pages: '41-48',
          topics: [
            'Seminar presentations',
            'Group project templates',
            'Teaching presentations',
          ],
        },
        {
          section: 'Resources and Tips',
          pages: '49-52',
          topics: [
            'Presentation checklist',
            'Software tips',
            'Further resources',
          ],
        },
      ],
      reviews: [
        {
          user: 'Carlos Martinez',
          date: '15/03/2025',
          rating: 5,
          comment:
            'Used these templates for my thesis defense and received numerous compliments on my presentation quality.',
        },
        {
          user: 'Jennifer Lee',
          date: '25/01/2025',
          rating: 5,
          comment:
            'Clean, professional designs that are easy to customize. Saved me hours of work preparing for a conference.',
        },
        {
          user: 'Ahmed Hassan',
          date: '08/11/2024',
          rating: 4,
          comment:
            'Excellent templates, though some of the color schemes needed adjustment for better contrast.',
        },
      ],
    },
    {
      id: 5,
      title: 'Research Methodology Overview',
      description:
        'Introduction to common research methodologies used in academic studies. This guide covers quantitative, qualitative, and mixed methods approaches across different disciplines, helping researchers select and implement appropriate methodologies.',
      type: 'PDF',
      category: 'research',
      size: '4.2 MB',
      date: 'Updated 25/11/2024',
      url: 'https://example-storage.com/files/research-methodology.pdf',
      pages: 64,
      author: 'Dr. Richard Taylor',
      publisher: 'Research Excellence Press',
      publicationYear: '2024',
      language: 'English',
      keywords: [
        'research methods',
        'methodology',
        'quantitative',
        'qualitative',
        'mixed methods',
      ],
      rating: 4.9,
      downloads: 4230,
      views: 8970,
      content: [
        {
          section: 'Research Paradigms',
          pages: '1-8',
          topics: [
            'Positivism',
            'Interpretivism',
            'Pragmatism',
            'Critical theory',
            'Choosing a research paradigm',
          ],
        },
        {
          section: 'Quantitative Methodologies',
          pages: '9-24',
          topics: [
            'Experimental designs',
            'Survey research',
            'Correlational studies',
            'Longitudinal methods',
            'Statistical approaches',
          ],
        },
        {
          section: 'Qualitative Methodologies',
          pages: '25-40',
          topics: [
            'Ethnography',
            'Phenomenology',
            'Grounded theory',
            'Case studies',
            'Narrative inquiry',
            'Content analysis',
          ],
        },
        {
          section: 'Mixed Methods Approaches',
          pages: '41-52',
          topics: [
            'Sequential designs',
            'Concurrent designs',
            'Transformative designs',
            'Integration strategies',
          ],
        },
        {
          section: 'Methodology Selection',
          pages: '53-60',
          topics: [
            'Aligning with research questions',
            'Disciplinary considerations',
            'Practical constraints',
            'Ethical dimensions',
          ],
        },
        {
          section: 'Resources',
          pages: '61-64',
          topics: [
            'Key texts by methodology',
            'Online resources',
            'Research communities',
          ],
        },
      ],
      reviews: [
        {
          user: 'Dr. Michelle Zhang',
          date: '20/03/2025',
          rating: 5,
          comment:
            "The most comprehensive yet accessible overview of research methodologies I've encountered. Essential reading for graduate students.",
        },
        {
          user: 'Prof. John Williams',
          date: '10/02/2025',
          rating: 5,
          comment:
            'I recommend this to all my doctoral students. The section on methodology selection is particularly valuable.',
        },
        {
          user: 'Sophia Anderson',
          date: '30/12/2024',
          rating: 4,
          comment:
            'Excellent resource that helped me design my thesis methodology. Would benefit from more examples in humanities.',
        },
      ],
    },
    {
      id: 6,
      title: 'Academic Reading Techniques',
      description:
        'Strategies for efficient reading of academic texts, including skimming, scanning, and critical analysis. Learn how to approach different types of academic literature with techniques that improve comprehension and retention while managing reading workload.',
      type: 'PDF',
      category: 'reading',
      size: '2.7 MB',
      date: 'Updated 18/10/2024',
      url: 'https://example-storage.com/files/reading-techniques.pdf',
      pages: 36,
      author: 'Dr. Katherine Lee',
      publisher: 'Scholarly Skills Press',
      publicationYear: '2024',
      language: 'English',
      keywords: [
        'academic reading',
        'reading strategies',
        'literature review',
        'critical reading',
      ],
      rating: 4.7,
      downloads: 1875,
      views: 4230,
      content: [
        {
          section: 'Understanding Academic Reading',
          pages: '1-5',
          topics: [
            'Differences from other reading',
            'Types of academic texts',
            'Reading challenges',
            'Setting reading goals',
          ],
        },
        {
          section: 'Preliminary Reading Techniques',
          pages: '6-10',
          topics: [
            'Previewing strategies',
            'Skimming methods',
            'Scanning approaches',
            'Determining relevance',
          ],
        },
        {
          section: 'In-Depth Reading Strategies',
          pages: '11-18',
          topics: [
            'SQ3R method',
            'Cornell reading approach',
            'Annotation techniques',
            'Concept mapping while reading',
          ],
        },
        {
          section: 'Critical Reading Skills',
          pages: '19-26',
          topics: [
            'Evaluating arguments',
            'Identifying bias',
            'Assessing evidence',
            'Recognizing theoretical frameworks',
          ],
        },
        {
          section: 'Managing Reading Workload',
          pages: '27-32',
          topics: [
            'Prioritizing readings',
            'Reading schedules',
            'Note organization',
            'Digital reading tools',
          ],
        },
        {
          section: 'Resources',
          pages: '33-36',
          topics: [
            'Reading enhancement tools',
            'Further practice activities',
            'Advanced reading resources',
          ],
        },
      ],
      reviews: [
        {
          user: 'Rebecca Johnson',
          date: '05/03/2025',
          rating: 5,
          comment:
            'This guide transformed my literature review process. The annotation techniques alone saved me countless hours.',
        },
        {
          user: 'Mark Davidson',
          date: '15/01/2025',
          rating: 4,
          comment:
            'Very practical strategies that actually work with real academic texts. The concept mapping approach was particularly helpful.',
        },
        {
          user: 'Priya Patel',
          date: '28/11/2024',
          rating: 5,
          comment:
            'As a non-native English speaker, these techniques have dramatically improved my comprehension of complex academic texts.',
        },
      ],
    },
    {
      id: 7,
      title: 'Academic Discussion Video Series',
      description:
        'Video tutorials on participating effectively in academic discussions and seminars. This series covers preparation, contribution strategies, questioning techniques, and follow-up practices for both in-person and online academic discussions.',
      type: 'VIDEO',
      category: 'speaking',
      size: '250 MB',
      date: 'Updated 30/09/2024',
      url: 'https://example-storage.com/files/discussion-videos.mp4',
      duration: '2 hours 15 minutes',
      author: 'Dr. James Wilson',
      publisher: 'Academic Communication Institute',
      publicationYear: '2024',
      language: 'English',
      keywords: [
        'academic discussions',
        'seminars',
        'participation',
        'speaking skills',
      ],
      rating: 4.8,
      downloads: 1560,
      views: 6720,
      content: [
        {
          section: 'Introduction to Academic Discussions',
          duration: '15:30',
          topics: [
            'Types of academic discussions',
            'Discussion expectations',
            'Cultural considerations',
            'Preparation mindset',
          ],
        },
        {
          section: 'Preparation Strategies',
          duration: '25:45',
          topics: [
            'Pre-reading approaches',
            'Note preparation',
            'Question development',
            'Creating discussion points',
          ],
        },
        {
          section: 'Effective Participation',
          duration: '30:20',
          topics: [
            'Contribution timing',
            "Building on others' ideas",
            'Non-verbal communication',
            'Managing nerves',
          ],
        },
        {
          section: 'Questioning Techniques',
          duration: '28:15',
          topics: [
            'Socratic questioning',
            'Clarification questions',
            'Challenging questions',
            'Follow-up approaches',
          ],
        },
        {
          section: 'Online Discussion Skills',
          duration: '22:40',
          topics: [
            'Digital platform navigation',
            'Virtual participation cues',
            'Technical considerations',
            'Building presence online',
          ],
        },
        {
          section: 'Post-Discussion Practices',
          duration: '12:30',
          topics: [
            'Reflection techniques',
            'Follow-up communication',
            'Incorporating feedback',
            'Continuous improvement',
          ],
        },
      ],
      reviews: [
        {
          user: 'Michael Chen',
          date: '25/03/2025',
          rating: 5,
          comment:
            'Excellent practical guidance that helped me overcome my anxiety about speaking in graduate seminars.',
        },
        {
          user: 'Laura Rodriguez',
          date: '12/02/2025',
          rating: 5,
          comment:
            'The section on questioning techniques transformed how I engage in class discussions. Highly recommended!',
        },
        {
          user: 'Sam Peterson',
          date: '05/01/2025',
          rating: 4,
          comment:
            'Very helpful content, especially for online discussions. Video quality could be improved in some sections.',
        },
      ],
    },
    {
      id: 8,
      title: 'Citation and Referencing Guide',
      description:
        'Comprehensive guide to APA, MLA, Chicago, and Harvard referencing styles. This detailed manual covers formatting guidelines, in-text citations, reference lists, and special source types for the major academic citation styles.',
      type: 'PDF',
      category: 'writing',
      size: '3.5 MB',
      date: 'Updated 15/08/2024',
      url: 'https://example-storage.com/files/citation-guide.pdf',
      pages: 48,
      author: 'Dr. Elizabeth Morgan',
      publisher: 'Academic Integrity Press',
      publicationYear: '2024',
      language: 'English',
      keywords: ['citations', 'references', 'APA', 'MLA', 'Chicago', 'Harvard'],
      rating: 4.9,
      downloads: 5620,
      views: 12340,
      content: [
        {
          section: 'Citation Fundamentals',
          pages: '1-6',
          topics: [
            'Purpose of citation',
            'Academic integrity',
            'Choosing a citation style',
            'Citation management tools',
          ],
        },
        {
          section: 'APA Style (7th Edition)',
          pages: '7-16',
          topics: [
            'In-text citation formats',
            'Reference list formatting',
            'Journal articles',
            'Books',
            'Websites',
            'Special sources',
          ],
        },
        {
          section: 'MLA Style (9th Edition)',
          pages: '17-26',
          topics: [
            'Parenthetical citations',
            'Works cited formatting',
            'Print sources',
            'Digital sources',
            'Media sources',
            'Unusual sources',
          ],
        },
        {
          section: 'Chicago Style (17th Edition)',
          pages: '27-36',
          topics: [
            'Notes-bibliography system',
            'Author-date system',
            'Footnotes and endnotes',
            'Bibliography formatting',
            'Special cases',
          ],
        },
        {
          section: 'Harvard Style',
          pages: '37-44',
          topics: [
            'In-text citation format',
            'Reference list guidelines',
            'Print sources',
            'Electronic sources',
            'Various media',
          ],
        },
        {
          section: 'Resources',
          pages: '45-48',
          topics: [
            'Citation software comparison',
            'Online citation tools',
            'Style guide websites',
            'Further reading',
          ],
        },
      ],
      reviews: [
        {
          user: 'Prof. Robert Johnson',
          date: '30/03/2025',
          rating: 5,
          comment:
            'The definitive guide to academic citation styles. I require all my students to use this resource.',
        },
        {
          user: 'Melissa Walker',
          date: '18/02/2025',
          rating: 5,
          comment:
            'Incredibly comprehensive and clear explanations. The examples for unusual sources are particularly helpful.',
        },
        {
          user: 'Daniel Kim',
          date: '25/12/2024',
          rating: 5,
          comment:
            'This guide saved me countless hours formatting my dissertation references. Cannot recommend highly enough.',
        },
      ],
    },
  ];

  // Find related materials for each material
  materialsDatabase.forEach((material) => {
    if (!material.relatedMaterials) {
      // Find 2 materials in the same category or with similar keywords
      material.relatedMaterials = materialsDatabase
        .filter((m) => m.id !== material.id && m.category === material.category)
        .slice(0, 2);
    }
  });

  // Fetch material data based on materialId
  useEffect(() => {
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const foundMaterial = materialsDatabase.find(
        (material) => material.id === parseInt(materialId),
      );

      if (foundMaterial) {
        setMaterialData(foundMaterial);
      }

      setLoading(false);
    }, 300); // Simulate network delay
  }, [materialId]);

  // Preview handlers
  const handleOpenPreview = () => {
    setIsPreviewOpen(true);
  };

  const handleClosePreview = () => {
    setIsPreviewOpen(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <svg
          className="animate-spin h-8 w-8 text-orange-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>
    );
  }

  if (!materialData) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Không tìm thấy thông tin tài liệu.</p>
      </div>
    );
  }

  // Calculate average rating
  const averageRating =
    materialData.reviews && materialData.reviews.length > 0
      ? materialData.reviews.reduce((sum, review) => sum + review.rating, 0) /
        materialData.reviews.length
      : 0;

  return (
    <div className="space-y-8">
      {/* Material Header */}
      <div className="rounded-lg bg-white shadow-md overflow-hidden">
        <div className="p-6 border-b">
          <div className="flex items-center mb-2">
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium mr-3 ${
                materialData.type === 'PDF'
                  ? 'bg-red-100 text-red-600'
                  : materialData.type === 'DOC'
                  ? 'bg-blue-100 text-blue-600'
                  : materialData.type === 'VIDEO'
                  ? 'bg-green-100 text-green-600'
                  : materialData.type === 'PPT'
                  ? 'bg-yellow-100 text-yellow-600'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {materialData.type}
            </span>
            <span className="text-sm font-medium text-gray-500">
              {materialData.size}
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            {materialData.title}
          </h1>
          <div className="flex items-center flex-wrap gap-4 mb-4">
            <div className="flex items-center">
              <svg
                className="h-5 w-5 text-yellow-400 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
              <span className="text-sm">
                {averageRating.toFixed(1)} ({materialData.reviews?.length || 0}{' '}
                đánh giá)
              </span>
            </div>
            <div className="flex items-center">
              <svg
                className="h-5 w-5 text-gray-500 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                ></path>
              </svg>
              <span className="text-sm">{materialData.downloads} lượt tải</span>
            </div>
            <div className="flex items-center">
              <svg
                className="h-5 w-5 text-gray-500 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                ></path>
              </svg>
              <span className="text-sm">{materialData.views} lượt xem</span>
            </div>
            <div className="flex items-center">
              <svg
                className="h-5 w-5 text-gray-500 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                ></path>
              </svg>
              <span className="text-sm">{materialData.date}</span>
            </div>
          </div>
          <p className="text-gray-700">{materialData.description}</p>
        </div>
      </div>

      {/* Material Content */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow-md">
            {/* Tabs */}
            <div className="border-b px-6">
              <ul className="flex flex-wrap -mb-px">
                <li className="mr-2">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`inline-block px-4 py-4 border-b-2 rounded-t-lg ${
                      activeTab === 'overview'
                        ? 'border-orange-500 text-orange-500'
                        : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    Tổng quan
                  </button>
                </li>
                <li className="mr-2">
                  <button
                    onClick={() => setActiveTab('content')}
                    className={`inline-block px-4 py-4 border-b-2 rounded-t-lg ${
                      activeTab === 'content'
                        ? 'border-orange-500 text-orange-500'
                        : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    Nội dung
                  </button>
                </li>
                <li className="mr-2">
                  <button
                    onClick={() => setActiveTab('reviews')}
                    className={`inline-block px-4 py-4 border-b-2 rounded-t-lg ${
                      activeTab === 'reviews'
                        ? 'border-orange-500 text-orange-500'
                        : 'border-transparent hover:border-gray-300'
                    }`}
                  >
                    Đánh giá
                  </button>
                </li>
              </ul>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'overview' && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">
                    Thông tin tài liệu
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h3 className="text-lg font-medium mb-3">Chi tiết</h3>
                      <ul className="space-y-2">
                        <li className="flex justify-between">
                          <span className="text-gray-600">Định dạng:</span>
                          <span className="font-medium">
                            {materialData.type}
                          </span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-600">Kích thước:</span>
                          <span className="font-medium">
                            {materialData.size}
                          </span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-600">
                            {materialData.type === 'VIDEO'
                              ? 'Thời lượng:'
                              : 'Số trang:'}
                          </span>
                          <span className="font-medium">
                            {materialData.type === 'VIDEO'
                              ? materialData.duration
                              : materialData.pages}
                          </span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-600">Ngôn ngữ:</span>
                          <span className="font-medium">
                            {materialData.language}
                          </span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-600">Ngày cập nhật:</span>
                          <span className="font-medium">
                            {materialData.date}
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-3">Xuất bản</h3>
                      <ul className="space-y-2">
                        <li className="flex justify-between">
                          <span className="text-gray-600">Tác giả:</span>
                          <span className="font-medium">
                            {materialData.author}
                          </span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-600">Nhà xuất bản:</span>
                          <span className="font-medium">
                            {materialData.publisher}
                          </span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-600">Năm xuất bản:</span>
                          <span className="font-medium">
                            {materialData.publicationYear}
                          </span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-600">Danh mục:</span>
                          <span className="font-medium capitalize">
                            {materialData.category}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {materialData.keywords &&
                    materialData.keywords.length > 0 && (
                      <div className="mb-6">
                        <h3 className="text-lg font-medium mb-3">Từ khóa</h3>
                        <div className="flex flex-wrap gap-2">
                          {materialData.keywords.map((keyword, index) => (
                            <span
                              key={index}
                              className="rounded-full bg-gray-100 px-3 py-1 text-sm"
                            >
                              {keyword}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                  <div className="mt-6">
                    <h3 className="text-lg font-medium mb-3">
                      Xem trước tài liệu
                    </h3>
                    <button
                      onClick={handleOpenPreview}
                      className="w-full flex items-center justify-center bg-gray-100 border rounded-lg p-8 hover:bg-gray-200 transition-colors"
                    >
                      <div className="text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          ></path>
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          ></path>
                        </svg>
                        <p className="mt-2 text-sm font-medium text-gray-900">
                          Click để xem trước tài liệu
                        </p>
                        <p className="text-xs text-gray-500">
                          {materialData.type} · {materialData.size} ·{' '}
                          {materialData.type === 'VIDEO'
                            ? materialData.duration
                            : materialData.pages + ' trang'}
                        </p>
                      </div>
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'content' && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">
                    Nội dung tài liệu
                  </h2>

                  {materialData.content && materialData.content.length > 0 ? (
                    <div className="space-y-4">
                      {materialData.content.map((section, index) => (
                        <div
                          key={index}
                          className="border rounded-lg overflow-hidden"
                        >
                          <div className="bg-gray-50 p-4 flex justify-between items-center">
                            <h3 className="font-medium">{section.section}</h3>
                            <span className="text-sm text-gray-500">
                              {materialData.type === 'VIDEO'
                                ? section.duration
                                : 'Trang ' + section.pages}
                            </span>
                          </div>
                          <div className="p-4">
                            <ul className="space-y-2">
                              {section.topics.map((topic, topicIndex) => (
                                <li
                                  key={topicIndex}
                                  className="flex items-start"
                                >
                                  <svg
                                    className="h-5 w-5 text-gray-400 mr-2 mt-0.5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M9 5l7 7-7 7"
                                    ></path>
                                  </svg>
                                  <span className="text-gray-700">{topic}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">
                      Không có thông tin chi tiết về nội dung.
                    </p>
                  )}
                </div>
              )}

              {activeTab === 'reviews' && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">
                    Đánh giá từ người dùng
                  </h2>

                  {materialData.reviews && materialData.reviews.length > 0 ? (
                    <div className="space-y-6">
                      {materialData.reviews.map((review, index) => (
                        <div
                          key={index}
                          className="border-b pb-4 last:border-b-0 last:pb-0"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium">{review.user}</p>
                              <p className="text-sm text-gray-500">
                                {review.date}
                              </p>
                            </div>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <svg
                                  key={i}
                                  className={`h-5 w-5 ${
                                    i < review.rating
                                      ? 'text-yellow-400'
                                      : 'text-gray-300'
                                  }`}
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                </svg>
                              ))}
                            </div>
                          </div>
                          <p className="mt-2 text-gray-700">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">
                      Chưa có đánh giá nào cho tài liệu này.
                    </p>
                  )}

                  <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                    <h3 className="text-lg font-medium mb-3">Viết đánh giá</h3>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Xếp hạng
                      </label>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <button
                            key={i}
                            className="h-8 w-8 text-gray-300 hover:text-yellow-400"
                          >
                            <svg fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                            </svg>
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nhận xét
                      </label>
                      <textarea
                        rows="4"
                        className="w-full rounded-lg border border-gray-300 p-2 focus:border-orange-500 focus:outline-none"
                        placeholder="Viết nhận xét của bạn..."
                      ></textarea>
                    </div>
                    <button className="rounded-full bg-orange-500 px-6 py-2 text-white hover:bg-orange-600">
                      Gửi đánh giá
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Related Materials */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Tài liệu liên quan</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {materialData.relatedMaterials &&
                materialData.relatedMaterials.map((material) => (
                  <div
                    key={material.id}
                    className="flex bg-white rounded-lg shadow-sm overflow-hidden"
                  >
                    <div
                      className={`w-2 ${
                        material.type === 'PDF'
                          ? 'bg-red-500'
                          : material.type === 'DOC'
                          ? 'bg-blue-500'
                          : material.type === 'VIDEO'
                          ? 'bg-green-500'
                          : material.type === 'PPT'
                          ? 'bg-yellow-500'
                          : 'bg-gray-500'
                      }`}
                    ></div>
                    <div className="p-4 flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={`rounded-full px-2 py-1 text-xs font-medium ${
                            material.type === 'PDF'
                              ? 'bg-red-100 text-red-600'
                              : material.type === 'DOC'
                              ? 'bg-blue-100 text-blue-600'
                              : material.type === 'VIDEO'
                              ? 'bg-green-100 text-green-600'
                              : material.type === 'PPT'
                              ? 'bg-yellow-100 text-yellow-600'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {material.type}
                        </span>
                        <span className="text-xs text-gray-500">
                          {material.size}
                        </span>
                      </div>
                      <h3 className="font-medium mb-1 line-clamp-1">
                        {material.title}
                      </h3>
                      <p className="text-sm text-gray-500 mb-2 line-clamp-2">
                        {material.description}
                      </p>
                      <Link
                        to={`/material/${material.id}`}
                        className="text-sm text-orange-500 hover:text-orange-600"
                      >
                        Xem chi tiết
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
            <div className="text-center mb-6">
              <p className="text-2xl font-bold text-orange-500 mb-2">
                Miễn phí
              </p>
              <p className="text-sm text-gray-500">Tài liệu học thuật</p>
            </div>

            <a
              href={materialData.url}
              download={materialData.title}
              className="block w-full bg-orange-500 text-white py-3 rounded-lg font-medium mb-4 text-center hover:bg-orange-600 transition-colors"
            >
              Tải xuống
            </a>

            <button className="w-full bg-white border border-orange-500 text-orange-500 py-3 rounded-lg font-medium mb-6 hover:bg-orange-50 transition-colors">
              Thêm vào bộ sưu tập
            </button>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-gray-600">Định dạng</span>
                <span className="font-medium">{materialData.type}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-gray-600">Kích thước</span>
                <span className="font-medium">{materialData.size}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-gray-600">
                  {materialData.type === 'VIDEO' ? 'Thời lượng' : 'Số trang'}
                </span>
                <span className="font-medium">
                  {materialData.type === 'VIDEO'
                    ? materialData.duration
                    : materialData.pages}
                </span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="text-gray-600">Ngôn ngữ</span>
                <span className="font-medium">{materialData.language}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Cập nhật</span>
                <span className="font-medium">{materialData.date}</span>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="font-medium mb-4">Chia sẻ tài liệu</h3>
              <div className="flex justify-center space-x-4">
                <button className="rounded-full bg-blue-500 p-2 text-white hover:bg-blue-600">
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path>
                  </svg>
                </button>
                <button className="rounded-full bg-sky-500 p-2 text-white hover:bg-sky-600">
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </button>
                <button className="rounded-full bg-green-500 p-2 text-white hover:bg-green-600">
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 10.894c0-.55-.044-1.095-.114-1.631H10.57v3.232h5.297c-.242 1.234-.92 2.3-1.942 3.01v2.394h3.117c1.816-1.68 2.858-4.157 2.858-7.005z"></path>
                    <path d="M10.57 21c2.597 0 4.776-.853 6.372-2.31l-3.117-2.394c-.866.574-1.975.912-3.255.912-2.493 0-4.607-1.686-5.368-3.947H2.017v2.47C3.578 18.891 6.828 21 10.57 21z"></path>
                    <path d="M5.202 13.26c-.193-.577-.3-1.191-.3-1.826 0-.636.107-1.25.3-1.826V7.139H2.017C1.461 8.324 1.14 9.651 1.14 11.034c0 1.383.321 2.71.877 3.895l3.185-2.67z"></path>
                    <path d="M10.57 6.435c1.404 0 2.668.476 3.66 1.41l2.756-2.764C15.405 3.577 13.226 2.7 10.57 2.7 6.828 2.7 3.578 4.809 2.017 7.87l3.185 2.67c.76-2.262 2.875-3.947 5.368-3.947z"></path>
                  </svg>
                </button>
                <button className="rounded-full bg-purple-500 p-2 text-white hover:bg-purple-600">
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002zM7 8.48H3V21h4V8.48zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Back to materials */}
      <div className="mt-8">
        <Link
          to="/materials"
          className="inline-flex items-center text-orange-500 hover:text-orange-600"
        >
          <svg
            className="h-5 w-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            ></path>
          </svg>
          Quay lại trang tài liệu
        </Link>
      </div>

      {/* Preview Modal */}
      <PreviewModal
        isOpen={isPreviewOpen}
        onClose={handleClosePreview}
        file={materialData}
      />
    </div>
  );
};

export default MaterialDetail;
