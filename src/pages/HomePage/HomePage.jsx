import styles from "./HomePage.module.css";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import MovieScroller from "../../components/MovieScroller/MovieScroller";

const HomePage = () => {
  return (
    <div className={styles.homepageWrapper}>
      <div className={styles.heroSection}>
        <div className={styles.heroDescriptionWrapper}>
          <div className={styles.heroMainTitleWrapper}>
            <h2>Track. Rate. Rediscover. </h2>
          </div>
          <div className={styles.heroBlurbWrapper}>
            <p>
              Build your personal movie library, rate and review, and find
              movielovers who share your tastes
            </p>
          </div>
          <div className={styles.heroCtaButtonbWrapper}>
            <Link to={"/sign-up"} className={styles.heroCtaButtonLink}>
              <Button className={styles.heroCtaButton}>Get started</Button>
            </Link>
          </div>
        </div>
        <div className={styles.heroImageWrapper}></div>
      </div>
      <div className={styles.featuresSection}>
        <div className={styles.featureCard}>
          <div className={styles.featureCardIconWrapper}>
            <img src="/assets/icons/bookmark.svg" alt="save feature" />
            <h3>Personal Collection</h3>
          </div>
          <div className={styles.featureCardDescriptionWrapper}>
            <p>Save movies you love, or want to watch</p>
          </div>
        </div>
        <div className={styles.featureCard}>
          <div className={styles.featureCardIconWrapper}>
            <img src="/assets/icons/star.svg" alt="rate feature" />
            <h3>Rate & Review</h3>
          </div>
          <div className={styles.featureCardDescriptionWrapper}>
            <p>Rate films and track favorites</p>
          </div>
        </div>
        <div className={styles.featureCard}>
          <div className={styles.featureCardIconWrapper}>
            <img src="/assets/icons/search.svg" alt="search feature" />
            <h3>Smart Search</h3>
          </div>
          <div className={styles.featureCardDescriptionWrapper}>
            <p>Rate films and track favorites</p>
          </div>
        </div>
        <div className={styles.featureCard}>
          <div className={styles.featureCardIconWrapper}>
            <img src="/assets/icons/bolt.svg" alt="new releases feature" />
            <h3>Discover</h3>
          </div>
          <div className={styles.featureCardDescriptionWrapper}>
            <p>Stay up to date with the newest releases</p>
          </div>
        </div>
      </div>
      <div className={styles.latestReleasesSection}>
        <h1>Browse the latest titles</h1>
        <MovieScroller queryParam={28}></MovieScroller>
      </div>
    </div>
  );
};

export default HomePage;
