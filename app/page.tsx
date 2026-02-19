"use client";
import FlyingDrone from './components/FlyingDrone';
import ProfileSection from './components/ProfileSection';
import TicTacToe from './components/TicTacToe';

export default function AboutMe() {
	return (
		<main className="min-h-screen flex flex-col items-center justify-center bg-[#f5f5dc]" style={{backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(214,201,165,0.3) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(214,201,165,0.3) 40px)'}}>
			<FlyingDrone />
			<ProfileSection />
			<TicTacToe />
		</main>
	);
}
