import {useGetUserMe} from "../../../_server/queries";
import Loading from "../../Components/Loading";
import ErrorBanner from "../../Components/ErrorBanner";

const MockedContent = ({title, text}: {title: string; text: string}) => {
  return (
    <div className="p-4 bg-accent rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <p>{text}</p>
    </div>
  );
};

const Tabs = () => {
  return (
    <div>
      <div role="tablist" className="tabs tabs-lifted">
        <a role="tab" className="tab">
          Tab 1
        </a>
        <a role="tab" className="tab tab-active">
          Tab 2
        </a>
        <a role="tab" className="tab">
          Tab 3
        </a>
      </div>
    </div>
  );
};

const Timeline = () => {
  return (
    <div>
      <ul className="timeline timeline-vertical">
        <li>
          <div className="timeline-start">1984</div>
          <div className="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="timeline-end timeline-box">
            First Macintosh computer
          </div>
          <hr />
        </li>
        <li>
          <hr />
          <div className="timeline-start">1998</div>
          <div className="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="timeline-end timeline-box">iMac</div>
          <hr />
        </li>
        <li>
          <hr />
          <div className="timeline-start">2001</div>
          <div className="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="timeline-end timeline-box">iPod</div>
          <hr />
        </li>
        <li>
          <hr />
          <div className="timeline-start">2007</div>
          <div className="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="timeline-end timeline-box">iPhone</div>
          <hr />
        </li>
        <li>
          <hr />
          <div className="timeline-start">2015</div>
          <div className="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="timeline-end timeline-box">Apple Watch</div>
        </li>
      </ul>
    </div>
  );
};

const Dashboard = () => {
  const {loading, error, data} = useGetUserMe();

  if (!data && loading) return <Loading />;
  if (error) return <ErrorBanner error={error} />;

  return (
    <div
      data-testid="Dashboard"
      className="flex flex-col items-center h-screen"
    >
      <div className="lg:max-w-screen-lg w-full">
        <div className="gap-4 p-4  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
          <MockedContent
            title="Mocked Content 1"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vehicula, purus nec lacinia feugiat, massa libero pellentesque justo. Curabitur eget ante eros. Vivamus bibendum, sapien nec viverra fermentum, libero est porta sapien."
          />
          <MockedContent
            title="Mocked Content 2"
            text="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."
          />
          <MockedContent
            title="Mocked Content 3"
            text="Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
          />
          <MockedContent
            title="Mocked Content 4"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vehicula, purus nec lacinia feugiat, massa libero pellentesque justo. Curabitur eget ante eros. Vivamus bibendum, sapien nec viverra fermentum, libero est porta sapien."
          />
          <MockedContent
            title="Mocked Content 4"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vehicula, purus nec lacinia feugiat, massa libero pellentesque justo. Curabitur eget ante eros. Vivamus bibendum, sapien nec viverra fermentum, libero est porta sapien."
          />
          <Tabs />
          <MockedContent
            title="Mocked Content 4"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vehicula, purus nec lacinia feugiat, massa libero pellentesque justo. Curabitur eget ante eros. Vivamus bibendum, sapien nec viverra fermentum, libero est porta sapien."
          />
          <Timeline />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
