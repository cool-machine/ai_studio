import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { Quote } from 'lucide-react';

interface Testimonial {
  id: string;
  quote: string;
  name: string;
  title: string;
  company: string;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    quote: "The Wharton Alumni AI Studio has been instrumental in helping our startup refine our AI strategy. The mentorship we received was invaluable.",
    name: "Sarah Chen",
    title: "Founder & CEO",
    company: "NeuralHealth"
  },
  {
    id: '2',
    quote: "Being a mentor in the Give Back program has kept me at the cutting edge of AI innovation while allowing me to contribute to the Wharton community.",
    name: "Michael Rodriguez",
    title: "VP of Product",
    company: "TechVentures"
  },
  {
    id: '3',
    quote: "The events organized by the Wharton Alumni AI Studio bring together the brightest minds in AI. I always leave with new insights and connections.",
    name: "Dr. James Wilson",
    title: "Chief Data Scientist",
    company: "Enterprise AI Solutions"
  },
  {
    id: '4',
    quote: "As an alum looking to transition into AI, the resources and network provided by the Studio have been incredibly helpful in navigating this complex field.",
    name: "Lisa Thompson",
    title: "Director of Innovation",
    company: "Global Innovation Fund"
  }
];

const TestimonialSlider: React.FC = () => {
  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      spaceBetween={30}
      slidesPerView={1}
      pagination={{ clickable: true }}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      className="testimonial-swiper"
    >
      {testimonials.map((testimonial) => (
        <SwiperSlide key={testimonial.id}>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <Quote className="h-10 w-10 text-primary opacity-20 mb-4" />
            <p className="text-lg text-neutral italic mb-6">{testimonial.quote}</p>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center text-primary font-bold">
                {testimonial.name.charAt(0)}
              </div>
              <div className="ml-4">
                <p className="font-semibold text-neutral-dark">{testimonial.name}</p>
                <p className="text-sm text-neutral">
                  {testimonial.title}, {testimonial.company}
                </p>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default TestimonialSlider;