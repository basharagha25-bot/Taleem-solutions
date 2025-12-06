-- Seed Data for Taleem Solutions

-- 1. Insert Countries
INSERT INTO countries (name_ar, slug, code, description, image_url) VALUES
('ألمانيا', 'germany', 'DE', 'وجهة التعليم المجاني الأولى في أوروبا، تتميز بجودة تعليم عالية وفرص عمل ممتازة.', '/images/germany.jpg'),
('رومانيا', 'romania', 'RO', 'وجهة مثالية لدراسة الطب والهندسة بتكاليف معيشية ودراسية منخفضة مقارنة بباقي دول أوروبا.', '/images/romania.jpg'),
('تركيا', 'turkey', 'TR', 'جسر بين الشرق والغرب، توفر تعليماً عالي الجودة ومنحاً دراسية مميزة للطلاب العرب.', '/images/turkey.jpg'),
('روسيا', 'russia', 'RU', 'تاريخ عريق في العلوم والطب، مع سهولة في إجراءات القبول والتأشيرة.', '/images/russia.jpg'),
('ماليزيا', 'malaysia', 'MY', 'بيئة إسلامية متطورة وتعليم باللغة الإنجليزية بتكاليف مناسبة.', '/images/malaysia.jpg');

-- 2. Insert Universities (We need to get Country IDs first, but for a simple seed we can use subqueries or just insert assuming order if IDs were serial, but they are UUIDs. 
-- So we will use a DO block or CTEs to insert safely.)

WITH country_ids AS (
    SELECT id, slug FROM countries
)
INSERT INTO universities (name_ar, slug, country_id, city_ar, description, ranking, tuition_range)
SELECT 
    'جامعة ميونخ التقنية', 
    'technical-university-munich', 
    id, 
    'ميونخ', 
    'واحدة من أفضل الجامعات في أوروبا، متميزة في الهندسة والتكنولوجيا.', 
    50, 
    'مجاني - 3000 يورو'
FROM country_ids WHERE slug = 'germany'
UNION ALL
SELECT 
    'جامعة بوخارست', 
    'university-of-bucharest', 
    id, 
    'بوخارست', 
    'أعرق جامعات رومانيا، تقدم برامج متنوعة في الطب والعلوم الإنسانية.', 
    800, 
    '2000 - 5000 يورو'
FROM country_ids WHERE slug = 'romania'
UNION ALL
SELECT 
    'جامعة إسطنبول', 
    'istanbul-university', 
    id, 
    'إسطنبول', 
    'جامعة تاريخية عريقة تقدم تعليماً متميزاً في مختلف التخصصات.', 
    600, 
    '500 - 2000 دولار'
FROM country_ids WHERE slug = 'turkey';

-- 3. Insert Programs
WITH uni_ids AS (
    SELECT id, slug FROM universities
)
INSERT INTO programs (university_id, name_ar, slug, degree_level, duration, language, tuition_fee, description)
SELECT 
    id, 
    'ماجستير هندسة البرمجيات', 
    'msc-software-engineering-tum', 
    'Master', 
    '2 Years', 
    'English', 
    0, 
    'برنامج متميز يركز على هندسة البرمجيات المتقدمة والذكاء الاصطناعي.'
FROM uni_ids WHERE slug = 'technical-university-munich'
UNION ALL
SELECT 
    id, 
    'بكالوريوس الطب البشري', 
    'md-medicine-bucharest', 
    'Bachelor', 
    '6 Years', 
    'English', 
    6000, 
    'دراسة الطب البشري باللغة الإنجليزية في العاصمة الرومانية.'
FROM uni_ids WHERE slug = 'university-of-bucharest'
UNION ALL
SELECT 
    id, 
    'بكالوريوس إدارة الأعمال', 
    'bba-istanbul', 
    'Bachelor', 
    '4 Years', 
    'English', 
    1500, 
    'برنامج شامل في إدارة الأعمال والاقتصاد.'
FROM uni_ids WHERE slug = 'istanbul-university';
