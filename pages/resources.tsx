import ResourceCard from "@components/cards/resourceCard/resourceCard";
import cardStyles from "@components/cards/cards.module.css";
import utilStyles from "@styles/utils.module.css";
import Layout from "@components/layout/layout";
import resources from "@data/resources";

const Resources = () => {
  return (
    <Layout title="Resources">
      <section className={utilStyles.container}>
        <div className={utilStyles.heading2Xl}>
          <h1>Resources</h1>
        </div>
        <section className={cardStyles.resourceCardContainer}>
          {resources.map(resource => <ResourceCard {...resource} />)}
        </section>
      </section>
    </Layout>
  );
};

export default Resources;
